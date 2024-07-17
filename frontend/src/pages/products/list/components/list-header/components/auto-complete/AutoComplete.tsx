import { useState, FC } from "react";
import { API } from "configs";
import {
  TextField,
  CircularProgress,
  Autocomplete,
  AutocompleteProps,
  Snackbar,
  Alert,
} from "@mui/material";

type AutoCompleteProps = Pick<
  AutocompleteProps<string, false, true, false>,
  "onChange" | "value"
>;

const AutoComplete: FC<AutoCompleteProps> = ({ value, onChange }) => {
  const [state, setState] = useState<{
    options: string[];
    loading: boolean;
    error: boolean;
  }>({
    options: [],
    loading: false,
    error: false,
  });

  return (
    <>
      <Snackbar
        open={state.error}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }

          setState((prevState) => ({
            ...prevState,
            error: false,
          }));
        }}
      >
        <Alert severity="error">Error. Try again</Alert>
      </Snackbar>
      <Autocomplete<string, false, true, false>
        id="asynchronous-demo"
        sx={{ flexBasis: 200 }}
        options={state.options}
        loading={state.loading}
        value={value}
        onChange={onChange}
        onOpen={async () => {
          if (!state.options.length) {
            setState((prevState) => ({
              ...prevState,
              loading: true,
              error: false,
            }));

            try {
              const { data } = await API.get(`/category-list`);

              setState((prevState) => ({
                ...prevState,
                loading: false,
                options: data,
              }));
            } catch (e) {
              setState((prevState) => ({
                ...prevState,
                error: true,
                loading: false,
              }));
            }
          }
        }}
        renderInput={(props) => (
          <TextField
            {...props}
            label="Category"
            variant="standard"
            InputProps={{
              ...props.InputProps,
              endAdornment: (
                <>
                  {state.loading ? (
                    <CircularProgress color="inherit" size={10} />
                  ) : null}
                  {props.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </>
  );
};

export default AutoComplete;
