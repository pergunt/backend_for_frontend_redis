import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Products } from "pages";

function App() {
  return (
    <Container maxWidth="sm">
      <Box p={2} boxShadow={5} borderRadius={2}>
        <Products.List />
      </Box>
    </Container>
  );
}

export default App;
