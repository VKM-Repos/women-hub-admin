// import "dotenv/config";

import axios, { AxiosInstance } from "axios";

// const backendApiURL = process?.env?.REACT_APP_BASE_URL;
// console.log(process?.env, "><<<<<<<<<<<<<");

export const authApi: AxiosInstance = axios.create({
  baseURL: "https://dev.womenhub.org/api/",
  // withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

authApi.interceptors.request.use(async (config) => {
  const userToken = localStorage.getItem("token");

  if (userToken) {
    config.headers["Authorization"] = `Bearer ${userToken}`;
  }

  return config;
});

export const publicApi: AxiosInstance = axios.create({
  baseURL: "https://dev.womenhub.org/api/",
});

publicApi.defaults.headers.common["Content-Type"] = "application/json";

export const handleApiError = (error: any) => {
  if (error.response) {
    console.error("Request failed with status code:", error.response.status);
    console.error("Response data:", error.response.data);
  } else if (error.request) {
    console.error("No response received. Request:", error.request);
  } else {
    console.error("Request setup error:", error.message);
  }
  return Promise.reject(error);
};

authApi.interceptors.response.use(
  (response) => response,
  (error) => handleApiError(error)
);
publicApi.interceptors.response.use(
  (response) => response,
  (error) => handleApiError(error)
);
