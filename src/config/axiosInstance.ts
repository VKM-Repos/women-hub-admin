// import "dotenv/config";

import useAppStore from "@/lib/store/app.store";
import axios, { AxiosInstance } from "axios";

export const authApi: AxiosInstance = axios.create({
  // baseURL: "https://dev.womenhub.org/api/",
  baseURL:
    "https://d201-2c0f-2a80-2e-f110-7908-83aa-1897-d3d1.ngrok-free.app/api/",
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

authApi.interceptors.request.use(async (config) => {
  const userToken = useAppStore.getState().user?.token;

  if (userToken) {
    config.headers["Authorization"] = `Bearer ${userToken}`;
  }

  return config;
});

export const publicApi: AxiosInstance = axios.create({
  // baseURL: "https://dev.womenhub.org/api/",
  baseURL:
    "https://d201-2c0f-2a80-2e-f110-7908-83aa-1897-d3d1.ngrok-free.app/api/",
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
