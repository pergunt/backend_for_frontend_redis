import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AutoComplete } from "./components";
import { useQueryParams, useLocation } from "hooks";
import { useEffect } from "react";

const ProductsListHeader = () => {
  const location = useLocation();
  const [params, setQueryParams] = useQueryParams();

  useEffect(() => {
    const stateFrom = location.state?.from;

    if (stateFrom?.category) {
      setQueryParams({ category: stateFrom.category });
    } else if (stateFrom?.search) {
      setQueryParams({ search: stateFrom.search });
    }

    delete location.state?.from;
  }, [location.state, setQueryParams]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
    >
      <TextField
        label="Search"
        variant="standard"
        sx={{ flexGrow: 2 }}
        value={params.search || ""}
        onChange={(event) => {
          setQueryParams({
            search: event.currentTarget.value,
          });
        }}
      />
      <AutoComplete
        value={params.category || ""}
        onChange={(event, value) => {
          setQueryParams({
            category: value,
          });
        }}
      />
    </Box>
  );
};

export default ProductsListHeader;
