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

import { Loading } from '../../Components';
import { NotFoundPage } from '..';

import { IBasketItem, IProduct } from '../../@Types';
import { currencyFormat } from '../../Utils';
import { basketServices, productServices } from '../../Services';

export const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [item, setItem] = useState<IBasketItem | null>(null);
  const [status, setStatus] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.currentTarget.value) >= 0)
      setQuantity(parseInt(event.currentTarget.value));
  };

  const handleUpdateCart = () => {
    if (!product) return;

    setStatus('pending');
    if (!item || quantity > item?.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      basketServices
        .addItem({
          productId: product.id,
          quantity: updatedQuantity,
        })
        .catch(console.log)
        .finally(() => setStatus(''));
    } else {
      const updatedQuantity = item.quantity - quantity;
      basketServices
        .removeItem({
          productId: product.id,
          quantity: updatedQuantity,
        })
        .catch(console.log)
        .finally(() => setStatus(''));
    }
  };

  useEffect(() => {
    if (id) {
      productServices
        .getById(Number(id))
        .then((p) => {
          setProduct(p);
          basketServices
            .getBasket()
            .then((b) => {
              const test = b?.items.find((i) => i.productId === p?.id);
              if (test) {
                setItem(test);
                setQuantity(test.quantity);
              }
            })
            .catch(console.log);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading) return <Loading message='Loading product...' />;

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
              {status === 'pending' ? (
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
  ) : (
    <NotFoundPage />
  );
};
