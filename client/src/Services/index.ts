import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useToast } from '../Utils';
import { router } from '../Router';
import { PaginationResponse } from '../@Types';
import { store } from '../Redux';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;
const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

axios.interceptors.request.use((config) => {
  const token = store.getState().auth.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (import.meta.env.DEV) await sleep();
    const pagination = response.headers['pagination'];
    if (pagination) {
      response.data = new PaginationResponse(
        response.data,
        JSON.parse(pagination),
      );
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        useToast.error(data.title);
        break;
      case 401:
        useToast.error(data.title);
        break;
      case 403:
        useToast.error('You are not allowed to do that!');
        break;
      case 500:
        router.navigate('/server-error', { state: { error: data } });
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  },
);

export const api = {
  get: (url: string, config?: AxiosRequestConfig) =>
    axios.get(url, config).then(responseBody),
  post: (url: string, body: object, config?: AxiosRequestConfig) =>
    axios.post(url, body, config).then(responseBody),
  put: (url: string, body: object, config?: AxiosRequestConfig) =>
    axios.put(url, body, config).then(responseBody),
  delete: (url: string, config?: AxiosRequestConfig) =>
    axios.delete(url, config).then(responseBody),
};

export * from './AuthServices';
export * from './BasketServices';
export * from './BuggyServices';
export * from './OrderServices';
export * from './PaymentServices';
export * from './ProductServices';
