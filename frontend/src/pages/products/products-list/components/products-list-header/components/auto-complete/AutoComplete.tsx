import { FC } from "react";
import { productsAPI } from "apis";
import { useAPI } from "hooks";
import {
  TextField,
  CircularProgress,
  Autocomplete,
  AutocompleteProps,
} from "@mui/material";

type AutoCompleteProps = Pick<
  AutocompleteProps<string, false, true, false>,
  "onChange" | "value"
>;

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { loading, data, fetchData } = useAPI<string[]>({
    request: async () => {
      const result = await productsAPI.getCategories();

      return result.data;
    },
  });

  return (
    <Autocomplete<string, false, true, false>
      {...props}
      data-testid="category-autocomplete"
      sx={{ flexBasis: 200 }}
      options={data || []}
      loading={loading}
      onOpen={async () => {
        if (!data?.length) {
          fetchData();
        }
      }}
      renderInput={(inputProps) => (
        <TextField
          {...inputProps}
          label="Category"
          variant="standard"
          InputProps={{
            ...inputProps.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={10} />
                ) : null}
                {inputProps.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AutoComplete;
