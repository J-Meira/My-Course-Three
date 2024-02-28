import axios, { AxiosError, AxiosResponse } from 'axios';
import { useToast } from '../Utils';
import { router } from '../Router';

axios.defaults.baseURL = 'http://localhost:5000/';
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
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
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

export * from './BuggyServices';
export * from './ProductServices';
