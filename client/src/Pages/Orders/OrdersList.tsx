import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import { IOrder } from '../../@Types';
import { currencyFormat, orderStatus } from '../../Utils';
import { PageTitle } from '../../Components';

export interface IOrdersListProps {
  orders: IOrder[];
  selectOrder: (orderId: number) => void;
}

export const OrdersList = ({ orders, selectOrder }: IOrdersListProps) => {
  return (
    <>
      <PageTitle title='Orders' />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align='center'>Date</TableCell>
              <TableCell align='right'>SubTotal</TableCell>
              <TableCell align='right'>Delivery Fee</TableCell>
              <TableCell align='right'>Total</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {order.id}
                </TableCell>
                <TableCell align='center'>
                  {order.orderDate.split('T')[0]}
                </TableCell>
                <TableCell align='right'>
                  $ {currencyFormat(order.subtotal)}
                </TableCell>
                <TableCell align='right'>
                  $ {currencyFormat(order.deliveryFee)}
                </TableCell>
                <TableCell align='right'>
                  $ {currencyFormat(order.total)}
                </TableCell>
                <TableCell align='center'>
                  {orderStatus[order.orderStatus]}
                </TableCell>
                <TableCell align='right'>
                  <Button onClick={() => selectOrder(order.id)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
