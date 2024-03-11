import { IBasketContentProps } from '../../@Types';
import { BasketTotals } from './BasketSummary';
import { BasketItems } from './BasketTable';

export const BasketContent = ({ items, isBasket }: IBasketContentProps) => {
  return (
    <>
      <BasketItems items={items} isBasket={isBasket} />
      <BasketTotals items={items} isBasket={isBasket} />
    </>
  );
};
