import { IBasketItem, IOrder } from '../../@Types';
import { PageTitle, BasketContent } from '../../Components';

export interface IOrderDetailsProps {
  order: IOrder;
  clearOrder: () => void;
}

export const OrderDetails = ({ order, clearOrder }: IOrderDetailsProps) => {
  return (
    <>
      <PageTitle title={`Order #${order.id}`} backAction={clearOrder} />
      <BasketContent items={order.orderItems as IBasketItem[]} showPaper />
    </>
  );
};
