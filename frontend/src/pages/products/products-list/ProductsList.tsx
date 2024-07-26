import { FC, useEffect, MouseEvent } from "react";
import { Box } from "@mui/material";
import { routes } from "configs";
import { ProductsAPI } from "apis";
import { hooks } from "./duck";
import { InfiniteScroll } from "components";
import * as LC from "./components";
import { useQueryParams, useNavigate, useLocation } from "hooks";

const LIMIT = 25;

const ProductsList: FC<{ api: Omit<ProductsAPI, "getOne"> }> = ({ api }) => {
  const navigate = useNavigate();
  const [params, setQueryParams] = useQueryParams();
  const location = useLocation();
  const {
    products,
    hasMore,
    searchProducts,
    fetchByCategory,
    fetchList,
    loading,
  } = hooks.useProducts(api);

  useEffect(() => {
    if (Object.keys(location.state?.from || {}).length) {
      return;
    }

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
  }, [params, location.state, searchProducts, fetchByCategory, fetchList]);

  useEffect(() => {
    const stateFrom = location.state?.from;

    if (stateFrom?.category) {
      setQueryParams({ category: stateFrom.category });
    } else if (stateFrom?.search) {
      setQueryParams({ search: stateFrom.search });
    }

    delete location.state?.from;
  }, [location.state, setQueryParams]);

  const onItemClick = (e: MouseEvent<HTMLButtonElement>) => {
    navigate(routes.productDetails(e.currentTarget.dataset.id!), {
      state: {
        from: params,
      },
    });
  };

  return (
    <Box>
      <LC.ProductsListHeader
        getCategories={api.getCategories.bind(api)}
        searchValue={params.search || ""}
        autoCompleteValue={params.category || ""}
        onSearch={(search) => {
          setQueryParams({ search });
        }}
        onCategory={(category) => {
          setQueryParams({ category });
        }}
      />
      <Box id="scrollableBox" height={500} sx={{ overflowY: "auto" }}>
        <InfiniteScroll
          scrollableTarget="scrollableBox"
          dataLength={products.length}
          hasMore={!Object.keys(params).length ? hasMore : false}
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
