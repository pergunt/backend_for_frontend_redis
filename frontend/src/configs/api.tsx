import ReactDOM from "react-dom/client";
import axios from "axios";
import { ErrorSnackbar } from "components";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.response.use(
  (config) => config,
  (error) => {
    const root = ReactDOM.createRoot(
      document.getElementById("error-box") as HTMLElement
    );

    root.render(<ErrorSnackbar />);

    throw error;
  }
);

export default API;
