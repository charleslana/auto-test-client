import axios, { AxiosError } from 'axios';
import router from '@/router';
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from '@/utils/localStorageUtils';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string
});

api.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const token = getTokenFromLocalStorage();
    if (error.response?.status === 401 || error.response?.status === 429 || !token) {
      removeTokenFromLocalStorage();
      router.push({ name: 'login' });
    }
    return Promise.reject(error);
  }
);

export default api;
