import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import { API_URL } from "consts";
import { routes } from "configs";
import { NavLink, Image } from "components";
import { ListHeader } from "./components";
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

  const loadData = (limit?: number) => {
    const queryParam = limit ? `?limit=${limit}` : "";

    return fetch(`${API_URL}/products${queryParam}`)
      .then((res) => res.json())
      .then((result) => {
        setState({
          loading: false,
          hasMore: result.total !== result.products.length,
          items: result.products,
        });
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box>
      <ListHeader />
      <Box id="scrollableDiv" height={500} style={{ overflowY: "auto" }}>
        <InfiniteScroll
          scrollableTarget="scrollableDiv"
          dataLength={state.items.length + Number(state.hasMore)}
          hasMore={state.hasMore}
          next={() => {
            loadData(state.items.length + LIMIT);
          }}
          loader={<CircularProgress color="info" size={40} />}
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
