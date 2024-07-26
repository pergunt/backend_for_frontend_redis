import axios from "axios";
import { ErrorSnackbar } from "components";
import { showError } from "utils";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.response.use(
  (config) => config,
  (error) => {
    showError({
      component: <ErrorSnackbar />,
      elID: "error-box",
    });

    throw error;
  }
);

export default API;
