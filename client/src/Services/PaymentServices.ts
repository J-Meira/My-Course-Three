import { api } from '.';
import { IBasket } from '../@Types';

const postIntent = (): Promise<IBasket | void> => api.post('payment', {});

export const paymentServices = {
  postIntent,
};
