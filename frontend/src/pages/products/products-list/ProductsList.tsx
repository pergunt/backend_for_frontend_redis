import { useState, useEffect, MouseEvent } from "react";
import {
  Box,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import { routes, API } from "configs";
import { Image, InfiniteScroll, PreLoader } from "components";
import qs from "query-string";
import { ProductsListHeader } from "./components";
import { useQueryParams, useNavigate } from "hooks";
import { ProductListItem } from "../types";
import styles from "./Product.module.css";

const LIMIT = 25;

const ProductsList = () => {
  const [state, setState] = useState<{
    loading: boolean;
    hasMore: boolean;
    items: ProductListItem[];
  }>({
    loading: false,
    hasMore: true,
    items: [],
  });
  const navigate = useNavigate();
  const [params] = useQueryParams();

  const loadData = async (url: string) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const { data } = await API.get(`/products${url}`);

      setState({
        loading: false,
        hasMore: data.total !== data.products.length,
        items: data.products,
      });
    } catch {
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    if (params.category) {
      loadData(`/category/${params.category}`);
    } else {
      const search = qs.stringify(params);
      const url = `${search ? `?${search}` : ""}`;

      const timer = setTimeout(() => {
        loadData(url);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [params]);

  const onItemClick = (e: MouseEvent<HTMLButtonElement>) => {
    navigate(routes.productDetails(Number(e.currentTarget.dataset.id!)), {
      state: {
        from: params,
      },
    });
  };

  return (
    <Box>
      <ProductsListHeader />
      <Box id="scrollableBox" height={500} style={{ overflowY: "auto" }}>
        <InfiniteScroll
          scrollableTarget="scrollableBox"
          style={{ overflow: "hidden" }}
          dataLength={state.items.length + Number(state.hasMore)}
          hasMore={state.hasMore}
          loader={state.loading && <PreLoader />}
          next={() => {
            loadData(`?limit=${state.items.length + LIMIT}`);
          }}
        >
          {state.items.map((item) => {
            return (
              <ListItemButton
                key={item.id}
                component="button"
                data-id={item.id}
                data-testid="products-list-item"
                className={styles.listItem}
                onClick={onItemClick}
              >
                <ListItemAvatar>
                  <Image alt="Product avatar" src={item.src} />
                </ListItemAvatar>
                <ListItemText
                  className={styles.listItemText}
                  primary={item.title}
                  secondary={`${item.price}$`}
                />
              </ListItemButton>
            );
          })}
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default ProductsList;
