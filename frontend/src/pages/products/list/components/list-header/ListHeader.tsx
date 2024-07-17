import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AutoComplete } from "./components";

function App() {
  const [autoCompleteValue, setAutoCompleteValue] = useState<
    string | undefined
  >();

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
        sx={{
          flexGrow: 2,
        }}
      />
      <AutoComplete
        value={autoCompleteValue}
        onChange={(event, value) => setAutoCompleteValue(value)}
      />
    </Box>
  );
}

export default App;
