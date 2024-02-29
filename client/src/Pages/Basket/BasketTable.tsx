import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
} from '@mui/material';
import { IBasketTableProps } from '../../@Types';
import { useState } from 'react';
import { LoadingIconButton } from '../../Components';
import { MdAdd, MdDelete, MdRemove } from 'react-icons/md';
import { basketServices } from '../../Services';
import { Link } from 'react-router-dom';

export const BasketTable = ({ items, isBasket }: IBasketTableProps) => {
  const [status, setStatus] = useState('');

  const addItem = (id: number) => {
    setStatus('add' + id);
    basketServices
      .addItem({
        productId: id,
        quantity: 1,
      })
      .catch(console.log)
      .finally(() => setStatus(''));
  };

  const removeItem = (id: number, quantity?: number) => {
    const type = quantity ? 'del' : 'rem';
    setStatus(type + id);
    basketServices
      .removeItem({
        productId: id,
        quantity: quantity || 1,
      })
      .catch(console.log)
      .finally(() => setStatus(''));
  };

  return (
    <TableContainer>
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
              <TableCell align='right'>
                ${(item.price / 100).toFixed(2)}
              </TableCell>
              <TableCell align='center'>
                <Box display='flex' alignItems='center' justifyContent='center'>
                  {isBasket && (
                    <LoadingIconButton
                      isLoading={status === 'rem' + item.productId}
                      onClick={() => removeItem(item.productId)}
                      color='error'
                      icon={<MdRemove />}
                    />
                  )}
                  <Typography sx={{ mr: 1, ml: 1 }}>{item.quantity}</Typography>
                  {isBasket && (
                    <LoadingIconButton
                      isLoading={status === 'add' + item.productId}
                      onClick={() => addItem(item.productId)}
                      color='secondary'
                      icon={<MdAdd />}
                    />
                  )}
                </Box>
              </TableCell>
              <TableCell align='right'>
                ${((item.price / 100) * item.quantity).toFixed(2)}
              </TableCell>
              {isBasket && (
                <TableCell align='right'>
                  <LoadingIconButton
                    isLoading={status === 'del' + item.productId}
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
    </TableContainer>
  );
};
