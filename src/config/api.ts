import axios, { AxiosError } from 'axios';
import router from '@/router';
import { getTokenFromLocalStorage } from '@/utils/localStorageUtils';

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
    if (error.response?.status === 401) {
      router.push({ name: 'home' });
    }
    return Promise.reject(error);
  }
);

export default api;
