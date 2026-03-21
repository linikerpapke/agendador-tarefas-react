import axios from "axios";
import { authService } from "./authService";

export const api = axios.create({
  baseURL: 'http://localhost:8083'
});

api.interceptors.request.use((config) => {
  const token = authService.getToken();

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});