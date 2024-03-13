import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableHead,
  Typography,
} from '@mui/material';
import { IBasketItem, IOrder } from '../../@Types';
import { PageTitle, BasketContent } from '../../Components';
import { orderStatus } from '../../Utils';

export interface IOrderDetailsProps {
  order: IOrder;
  clearOrder: () => void;
}

export const OrderDetails = ({ order, clearOrder }: IOrderDetailsProps) => {
  return (
    <>
      <PageTitle title='Order details' backAction={clearOrder} />
      <TableContainer component={Paper} square>
        <Table>
          <TableHead>
            <TableRow sx={{ fontWeight: 600 }}>
              <TableCell>#</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ fontSize: '1.1em' }}>
            <TableRow>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.orderDate.split('T')[0]}</TableCell>
              <TableCell>{orderStatus[order.orderStatus]}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography sx={{ textAlign: 'center', m: 2 }} variant='h4'>
        Products:
      </Typography>
      <BasketContent items={order.orderItems as IBasketItem[]} showPaper />
    </>
  );
};
