import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AutoComplete } from "./components";
import { useQueryParams } from "hooks";

function App() {
  const [params, setQueryParams] = useQueryParams();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
    >
      <TextField
        id="standard-basic"
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
}

export default App;
