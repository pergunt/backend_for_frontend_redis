import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import { API_URL } from "consts";
import { routes } from "configs";
import { NavLink, Image } from "components";
import qs from "query-string";
import { ListHeader } from "./components";
import { useQueryParams } from "hooks";
import { debounce } from "utils";
import { ProductListItem } from "./types";

const LIMIT = 25;
const baseURL = `${API_URL}/products`;

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
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setState({
          loading: false,
          hasMore: result.total !== result.products.length,
          items: result.products,
        });
      });
  };

  // eslint-disable-next-line
  const cb = useCallback(
    debounce((search: string) => {
      loadData(`${baseURL}${search ? `?${search}` : ""}`);
    }, 500),
    []
  );

  useEffect(() => {
    const search = qs.stringify(params);

    if (params.category) {
      loadData(`${baseURL}/category/${params.category}`);
    } else {
      cb(search);
    }
  }, [params, cb]);

  return (
    <Box>
      <ListHeader />
      <Box id="scrollableDiv" height={500} style={{ overflowY: "auto" }}>
        <InfiniteScroll
          scrollableTarget="scrollableDiv"
          dataLength={state.items.length + Number(state.hasMore)}
          hasMore={state.hasMore}
          loader={<CircularProgress color="info" size={40} />}
          next={() => {
            loadData(`${baseURL}/?limit=${state.items.length + LIMIT}`);
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
