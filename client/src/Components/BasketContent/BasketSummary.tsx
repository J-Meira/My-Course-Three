import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
  Button,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { IBasketContentProps } from '../../@Types';
import { currencyFormat } from '../../Utils';
import { Link } from 'react-router-dom';

export const BasketTotals = ({ items, isBasket }: IBasketContentProps) => {
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    const sum = items.reduce((prev, item) => {
      return (prev += item.quantity * item.price);
    }, 0);
    setSubTotal(sum);
    setDeliveryFee(sum > 500 ? 0 : 100);
  }, [items]);

  const render = (() => (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2}>Subtotal</TableCell>
          <TableCell align='right'>$ {currencyFormat(subTotal)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>Delivery fee*</TableCell>
          <TableCell align='right'>$ {currencyFormat(deliveryFee)}</TableCell>
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
        {isBasket && (
          <TableRow>
            <TableCell colSpan={3} sx={{ border: 0 }}>
              <Button
                component={Link}
                to='/checkout'
                variant='contained'
                size='large'
                fullWidth
              >
                Checkout
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  ))();

  return (
    <Box display='flex' flexDirection='column' alignItems='flex-end'>
      {isBasket ? (
        <TableContainer
          component={Paper}
          square
          sx={{ width: '100%', maxWidth: 365 }}
        >
          {render}
        </TableContainer>
      ) : (
        <TableContainer sx={{ width: '100%', maxWidth: 365 }}>
          {render}
        </TableContainer>
      )}
    </Box>
  );
};
