import { FC, useState } from "react";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { API_URL } from "consts";

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
              const response = await fetch(`${API_URL}/products/category-list`);

              if (!response.ok) {
                throw new Error();
              }

              const options = await response.json();

              setState((prevState) => ({
                ...prevState,
                loading: false,
                options,
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
        getOptionLabel={(option) => option}
        options={state.options}
        loading={state.loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Category"
            variant="standard"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {state.loading ? (
                    <CircularProgress color="inherit" size={10} />
                  ) : null}
                  {params.InputProps.endAdornment}
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
