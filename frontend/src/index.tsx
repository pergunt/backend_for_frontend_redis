import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "components";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ScopedCssBaseline>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ScopedCssBaseline>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
