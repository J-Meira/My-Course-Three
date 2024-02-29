import { api } from '.';
import { IBasket, IBasketItemUpdate } from '../@Types';

export const basketServices = {
  getBasket: (): Promise<IBasket | null> => api.get('basket'),
  addItem: (params: IBasketItemUpdate): Promise<IBasket | null> =>
    api.post('basket', {}, { params: { ...params } }),
  removeItem: (params: IBasketItemUpdate) =>
    api.delete('basket', { params: { ...params } }),
};
