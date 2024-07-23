import { useState, FC } from "react";
import { API } from "configs";
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
  const [state, setState] = useState<{
    options: string[];
    loading: boolean;
  }>({
    options: [],
    loading: false,
  });

  return (
    <Autocomplete<string, false, true, false>
      {...props}
      data-testid="category-autocomplete"
      sx={{ flexBasis: 200 }}
      options={state.options}
      loading={state.loading}
      onOpen={async () => {
        if (!state.options.length) {
          setState((prevState) => ({
            ...prevState,
            loading: true,
          }));

          try {
            const { data } = await API.get(`/products/category-list`);

            setState((prevState) => ({
              ...prevState,
              loading: false,
              options: data,
            }));
          } catch (e) {
            setState((prevState) => ({
              ...prevState,
              loading: false,
            }));
          }
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
                {state.loading ? (
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
