import { useState, useEffect, MouseEvent } from "react";
import { Box } from "@mui/material";
import { routes } from "configs";
import { productsAPI } from "apis";
import { InfiniteScroll } from "components";
import * as LC from "./components";
import { useQueryParams, useNavigate, useAPI } from "hooks";
import { Product } from "types";

const LIMIT = 25;

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const { loading: searching, fetchData: searchProducts } = useAPI<
    Product[],
    string
  >({
    onSuccess: setProducts,
    request: async (value) => {
      const { data } = await productsAPI.search(value);

      return data;
    },
  });
  const { loading: byCategoryLoading, fetchData: fetchByCategory } = useAPI<
    Product[],
    string
  >({
    onSuccess: setProducts,
    request: async (category) => {
      const { data } = await productsAPI.getByCategory(category);

      return data;
    },
  });

  const {
    loading: listLoading,
    data: listData,
    fetchData: fetchList,
  } = useAPI<
    {
      products: Product[];
      total: number;
    },
    number | void
  >({
    onSuccess: (result) => {
      setProducts(result.products);
    },
    request: async (limit) => {
      const { data } = await productsAPI.getList(limit);

      return data;
    },
  });

  const loading = searching || byCategoryLoading || listLoading;

  const navigate = useNavigate();
  const [params] = useQueryParams();

  useEffect(() => {
    if (params.search) {
      const timer = setTimeout(() => {
        searchProducts(params.search);
      }, 400);

      return () => clearTimeout(timer);
    }

    if (params.category) {
      fetchByCategory(params.category);
    } else {
      fetchList();
    }
  }, [params, searchProducts, fetchByCategory, fetchList]);

  const onItemClick = (e: MouseEvent<HTMLButtonElement>) => {
    navigate(routes.productDetails(Number(e.currentTarget.dataset.id!)), {
      state: {
        from: params,
      },
    });
  };

  const hasMore = listData ? products.length < listData.total : false;

  return (
    <Box>
      <LC.ProductsListHeader />
      <Box id="scrollableBox" height={500} style={{ overflowY: "auto" }}>
        <InfiniteScroll
          scrollableTarget="scrollableBox"
          dataLength={products.length + Number(hasMore)}
          hasMore={hasMore}
          loading={loading}
          next={() => {
            fetchList(products.length + LIMIT);
          }}
        >
          {products.map((item) => (
            <LC.ProductListItem onClick={onItemClick} key={item.id} {...item} />
          ))}
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default ProductsList;
