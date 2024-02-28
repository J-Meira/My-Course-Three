import { api } from '.';
import { IProduct } from '../@Types';

export const productServices = {
  getAll: (): Promise<IProduct[]> => api.get('product'),
  getById: (id: number): Promise<IProduct | null> => api.get(`product/${id}`),
};
