import { api } from '.';
import { IBasket, IBasketItemUpdate } from '../@Types';

const getBasket = (): Promise<IBasket | null> => api.get('basket');
const addItem = (params: IBasketItemUpdate): Promise<IBasket | null> =>
  api.post('basket', {}, { params: { ...params } });
const removeItem = (params: IBasketItemUpdate) =>
  api.delete('basket', { params: { ...params } });

export const basketServices = {
  getBasket,
  addItem,
  removeItem,
};
