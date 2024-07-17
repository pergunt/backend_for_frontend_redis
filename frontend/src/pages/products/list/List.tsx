import { useState, useEffect, useCallback } from "react";
import {
  Box,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import { routes, API } from "configs";
import { NavLink, Image, InfiniteScroll, PreLoader } from "components";
import qs from "query-string";
import { ListHeader } from "./components";
import { useQueryParams } from "hooks";
import { debounce } from "utils";
import { ProductListItem } from "./types";

const LIMIT = 25;

function App() {
  const [state, setState] = useState<{
    loading: boolean;
    hasMore: boolean;
    items: ProductListItem[];
  }>({
    loading: false,
    hasMore: true,
    items: [],
  });
  const [params] = useQueryParams();

  const loadData = (url: string) => {
    API.get(url).then(({ data }) => {
      setState({
        loading: false,
        hasMore: data.total !== data.products.length,
        items: data.products,
      });
    });
  };

  // eslint-disable-next-line
  const debouncedFetch = useCallback(
    debounce((search: string) => {
      loadData(`${search ? `?${search}` : ""}`);
    }, 500),
    []
  );

  useEffect(() => {
    const search = qs.stringify(params);

    if (params.category) {
      loadData(`/category/${params.category}`);
    } else {
      debouncedFetch(search);
    }
  }, [params, debouncedFetch]);

  return (
    <Box>
      <ListHeader />
      <Box id="scrollableDiv" height={500} style={{ overflowY: "auto" }}>
        <InfiniteScroll
          scrollableTarget="scrollableDiv"
          dataLength={state.items.length + Number(state.hasMore)}
          hasMore={state.hasMore}
          loader={<PreLoader />}
          next={() => {
            loadData(`?limit=${state.items.length + LIMIT}`);
          }}
        >
          {state.items.map((item) => {
            return (
              <ListItemButton
                key={item.id}
                to={routes.productDetails(item.id)}
                component={NavLink}
              >
                <ListItemAvatar>
                  <Image alt="Product avatar" src={item.images[0]} />
                </ListItemAvatar>
                <ListItemText
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
}

export default App;
