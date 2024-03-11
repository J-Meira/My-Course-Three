import { IBasketContentProps } from '../../@Types';
import { BasketTotals } from './BasketSummary';
import { BasketItems } from './BasketTable';

export const BasketContent = ({
  items,
  isBasket,
  showPaper = false,
}: IBasketContentProps) => {
  return (
    <>
      <BasketItems items={items} isBasket={isBasket} showPaper={showPaper} />
      <BasketTotals items={items} isBasket={isBasket} showPaper={showPaper} />
    </>
  );
};
