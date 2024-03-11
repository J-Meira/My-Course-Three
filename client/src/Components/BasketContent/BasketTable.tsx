import { Link } from 'react-router-dom';

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { MdAdd, MdDelete, MdRemove } from 'react-icons/md';

import { LoadingIconButton } from '../../Components';

import { IBasketContentProps } from '../../@Types';
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks';
import { addBasketItem, removeBasketItem } from '../../Redux/Slices';
import { currencyFormat } from '../../Utils';

export const BasketItems = ({ items, isBasket }: IBasketContentProps) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.basket);

  const addItem = (id: number) =>
    dispatch(
      addBasketItem({
        productId: id,
      }),
    );

  const removeItem = (id: number, quantity?: number) =>
    dispatch(
      removeBasketItem({
        productId: id,
        quantity: quantity,
      }),
    );

  const render = (() => (
    <Table sx={{ minWidth: 650 }}>
      <TableHead>
        <TableRow>
          <TableCell>Product</TableCell>
          <TableCell align='right'>Price</TableCell>
          <TableCell align='center'>Quantity</TableCell>
          <TableCell align='right'>Subtotal</TableCell>
          {isBasket && <TableCell align='right'></TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.productId}>
            <TableCell component='th' scope='row'>
              <Box
                display='flex'
                alignItems='center'
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
                component={Link}
                to={`/product/${item.productId}`}
              >
                <img
                  src={item.pictureUrl}
                  alt={item.name}
                  style={{ height: 50, marginRight: 20 }}
                />
                <Typography color='inherit'>{item.name}</Typography>
              </Box>
            </TableCell>
            <TableCell align='right'>$ {currencyFormat(item.price)}</TableCell>
            <TableCell align='center'>
              <Box display='flex' alignItems='center' justifyContent='center'>
                {isBasket && (
                  <LoadingIconButton
                    isLoading={status === 'pendingRemoveItem' + item.productId}
                    onClick={() => removeItem(item.productId)}
                    color='error'
                    icon={<MdRemove />}
                  />
                )}
                <Typography sx={{ mr: 1, ml: 1 }}>{item.quantity}</Typography>
                {isBasket && (
                  <LoadingIconButton
                    isLoading={status === 'pendingAddItem' + item.productId}
                    onClick={() => addItem(item.productId)}
                    color='secondary'
                    icon={<MdAdd />}
                  />
                )}
              </Box>
            </TableCell>
            <TableCell align='right'>
              $ {currencyFormat(item.price * item.quantity)}
            </TableCell>
            {isBasket && (
              <TableCell align='right'>
                <LoadingIconButton
                  isLoading={status === 'pendingDeleteItem' + item.productId}
                  onClick={() => removeItem(item.productId, item.quantity)}
                  color='secondary'
                  icon={<MdDelete />}
                />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ))();

  return isBasket ? (
    <TableContainer component={Paper} square>
      {render}
    </TableContainer>
  ) : (
    <TableContainer>{render}</TableContainer>
  );
};
