import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { MdArrowBackIosNew } from 'react-icons/md';

import { NotFoundPage } from '..';

import { IBasketItem } from '../../@Types';
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks';
import {
  addBasketItem,
  getLoading,
  getProductById,
  productSelectors,
  removeBasketItem,
} from '../../Redux/Slices';
import { currencyFormat } from '../../Utils';

export const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const basket = useAppSelector((state) => state.basket.current);
  const status = useAppSelector((state) => state.basket.status);
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, Number(id)),
  );
  const isLoading = useAppSelector(getLoading);
  const [quantity, setQuantity] = useState(0);
  const [item, setItem] = useState<IBasketItem | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.currentTarget.value) >= 0)
      setQuantity(parseInt(event.currentTarget.value));
  };

  const handleUpdateCart = () => {
    if (!product) return;
    if (!item || quantity > item?.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItem({
          productId: product.id,
          quantity: updatedQuantity,
        }),
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItem({
          productId: product.id,
          quantity: updatedQuantity,
        }),
      );
      if (quantity === 0) setItem(null);
    }
  };

  useEffect(() => {
    if (!product) dispatch(getProductById(Number(id)));
    const test = basket?.items.find((i) => i.productId === product?.id);
    setItem(test || null);
    setQuantity(test?.quantity || 0);
  }, [id, basket, product, dispatch]);

  return product ? (
    <Grid container spacing={6}>
      <Grid item sm={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid item sm={6}>
        <Box
          display='flex'
          alignItems='flex-start'
          justifyContent='space-between'
        >
          <Typography variant='h2' sx={{ fontSize: '1.9rem', fontWeight: 600 }}>
            {product.name}
          </Typography>
          <IconButton
            size='large'
            color='inherit'
            aria-label='back to shop'
            edge='start'
            sx={{ ml: 1 }}
            onClick={() => navigate(-1)}
          >
            <MdArrowBackIosNew />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, mt: 1 }} />
        <Typography sx={{ fontWeight: 500 }} variant='h4' color='secondary'>
          $ {currencyFormat(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody sx={{ fontSize: '1.1em' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>
                  Quantity in stock
                </TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputChange}
              variant='outlined'
              type='number'
              label='Quantity in Cart'
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              onClick={handleUpdateCart}
              sx={{ height: '55px' }}
              color='primary'
              size='large'
              variant='contained'
              fullWidth
            >
              {status.includes('pending') ? (
                <CircularProgress size='1.5rem' />
              ) : item ? (
                'Update Quantity'
              ) : (
                'Add to Cart'
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : !isLoading ? (
    <NotFoundPage />
  ) : null;
};
