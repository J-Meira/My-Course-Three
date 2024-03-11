import { api } from '.';
import { IOrder, IOrderCreate } from '../@Types';

const getAll = () => api.get('order');

const getById = (id: number): Promise<IOrder | null> => api.get(`order/${id}`);

const createOrder = (data: IOrderCreate): Promise<number | void> =>
  api.post('order', data);

export const orderServices = {
  getAll,
  getById,
  createOrder,
};
