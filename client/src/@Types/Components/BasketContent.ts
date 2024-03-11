import { IBasketItem } from '..';

export interface IBasketContentProps {
  items: IBasketItem[];
  isBasket?: boolean;
  showPaper?: boolean;
}
