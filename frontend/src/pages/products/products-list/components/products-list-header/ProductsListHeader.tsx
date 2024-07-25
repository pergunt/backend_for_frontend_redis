import { FC } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AutoComplete } from "./components";
import { ProductsAPI } from "apis";

interface ProductsListHeader extends Pick<ProductsAPI, "getCategories"> {
  searchValue: string;
  autoCompleteValue: string;
  onSearch: (value: string) => void;
  onCategory: (value: string) => void;
}

const ProductsListHeader: FC<ProductsListHeader> = ({
  onSearch,
  onCategory,
  searchValue,
  autoCompleteValue,
  getCategories,
}) => {
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
        value={searchValue}
        onChange={(event) => {
          onSearch(event.currentTarget.value);
        }}
      />
      <AutoComplete
        getCategories={getCategories}
        value={autoCompleteValue}
        onChange={(event, value) => {
          onCategory(value);
        }}
      />
    </Box>
  );
};

export default ProductsListHeader;
