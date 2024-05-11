import { API_URL } from "@/config";
import { useNotificationStore } from "@/stores/notifications";
import { APIErrorResponse } from "@/types/api";
import storage from "@/utils/storage";
import Axios, { InternalAxiosRequestConfig } from "axios";

const setAuthorizationHeader = (
  config: InternalAxiosRequestConfig<unknown>,
) => {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
};

export const axiosInstance = Axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Accept = "application/json";
    setAuthorizationHeader(config);
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message =
      (error.response?.data as APIErrorResponse)?.message || error.message;

    useNotificationStore.getState().addNotification({
      type: "error",
      title: "Error",
      message,
    });

    return Promise.reject(error);
  },
);
