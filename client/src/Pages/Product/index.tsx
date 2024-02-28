import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Box,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { MdArrowBackIosNew } from 'react-icons/md';

import { Loading } from '../../Components';
import { NotFoundPage } from '..';

import { IProduct } from '../../@Types';
import { currencyFormat } from '../../Utils';
import { productServices } from '../../Services';

export const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      productServices
        .getById(Number(id))
        .then((r) => setProduct(r))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading) return <Loading message='Loading product...' />;

  return product ? (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={6}>
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
          ${currencyFormat(product.price)}
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
      </Grid>
    </Grid>
  ) : (
    <NotFoundPage />
  );
};
