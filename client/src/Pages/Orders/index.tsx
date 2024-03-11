import { useEffect, useState } from 'react';
import { IOrder } from '../../@Types';
import { useAppDispatch } from '../../Redux/Hooks';
import { removeLoading, setLoading } from '../../Redux/Slices';
import { orderServices } from '../../Services';
import { OrderDetails } from './OrderDetails';
import { OrdersList } from './OrdersList';

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    dispatch(setLoading('pendingOrders'));
    orderServices
      .getAll()
      .then((orders) => setOrders(orders))
      .catch((error) => console.log(error))
      .finally(() => dispatch(removeLoading('pendingOrders')));
  }, [dispatch]);

  return selectedId > 0 && orders[selectedId] ? (
    <OrderDetails
      order={orders[selectedId]}
      clearOrder={() => setSelectedId(0)}
    />
  ) : (
    <OrdersList
      orders={orders}
      selectOrder={(orderId: number) => setSelectedId(orderId)}
    />
  );
};
