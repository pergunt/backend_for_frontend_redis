import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Products, CatchAll } from "pages";
import { routes } from "configs";
import { Routes, Route, Navigate } from "components";

function App() {
  return (
    <Container maxWidth="sm">
      <Box p={2} boxShadow={5} borderRadius={2}>
        <Routes>
          <Route path={routes.products} element={<Products.List />} />
          <Route
            path={routes.productDetails()}
            element={<Products.Details />}
          />
          <Route path="/" element={<Navigate to={routes.products} />} />
          <Route path="*" element={<CatchAll />} />
        </Routes>
      </Box>
    </Container>
  );
}

export default App;
