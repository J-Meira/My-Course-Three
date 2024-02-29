import { IBasket } from '..';

export interface IBasketState {
  current: IBasket | null;
  status: string;
}
