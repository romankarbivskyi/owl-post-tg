import axios from "axios";
import { authUser } from "@/api/users.ts";
import WebApp from "@twa-dev/sdk";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) throw new Error("Missing API_URL");

export const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    console.error("Request error:", err);
    return Promise.reject(err);
  },
);

API.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const initData = WebApp.initData;

        if (!initData) {
          console.error("Missing WebApp initData. Cannot authenticate.");
          return Promise.reject(err);
        }

        const {
          data: { token },
          status,
        } = await authUser(initData);

        if (status !== 200 || !token) {
          console.error("Failed to authenticate user. Invalid token response.");
          return Promise.reject(err);
        }

        localStorage.setItem("token", token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return API.request(originalRequest);
      } catch (authError) {
        console.error("Token refresh failed:", authError);
        return Promise.reject(authError);
      }
    }

    console.error("Response error:", err);
    return Promise.reject(err);
  },
);
