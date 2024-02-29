import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { IBasketTableProps } from '../../@Types';
import { currencyFormat } from '../../Utils';

export const BasketSummary = ({ items }: IBasketTableProps) => {
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    const sum = items.reduce((prev, item) => {
      return (prev += item.quantity * item.price);
    }, 0);
    setSubTotal(sum);
    setDeliveryFee(sum > 500 ? 0 : 100);
  }, [items]);

  return (
    <>
      <TableContainer sx={{ width: '100%', maxWidth: 365 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align='right'>$ {currencyFormat(subTotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align='right'>
                $ {currencyFormat(deliveryFee)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align='right'>
                $ {currencyFormat(subTotal + deliveryFee)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography style={{ fontStyle: 'italic' }}>
                  *Orders over $ 500 qualify for free delivery
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
