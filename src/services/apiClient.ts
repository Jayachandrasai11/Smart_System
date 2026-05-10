import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import {ENV} from '../config/env';
import {getAuthToken, getRefreshToken, setAuthToken, setRefreshToken} from '../utils/storage';

interface CustomConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config: CustomConfig) => {
    const token = await getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getRefreshToken();
        if (refreshToken) {
          const response = await axios.post(`${ENV.API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const {token, refreshToken: newRefreshToken} = response.data;
          await setAuthToken(token);
          await setRefreshToken(newRefreshToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;