import Container from "@mui/material/Container";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Box from "@mui/material/Box";
import { Products, CatchAll } from "pages";
import { routes } from "configs";
import { Routes, Route, Navigate, BrowserRouter } from "components";

const App = () => {
  return (
    <ScopedCssBaseline>
      <Box id="error-box" data-testid="error-box" />
      <BrowserRouter>
        <Container maxWidth="sm">
          <Box p={2} boxShadow={5} borderRadius={2}>
            <Routes>
              <Route
                path={routes.products}
                element={<Products.ProductsList />}
              />
              <Route
                path={routes.productDetails()}
                element={<Products.ProductDetails />}
              />
              <Route path="/" element={<Navigate to={routes.products} />} />
              <Route path="*" element={<CatchAll />} />
            </Routes>
          </Box>
        </Container>
      </BrowserRouter>
    </ScopedCssBaseline>
  );
};

export default App;
