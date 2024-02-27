import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';

import { IProduct } from '../../@Types';
import { currencyFormat } from '../../Utils';

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((r) => setProduct(r.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));

    // eslint-disable-next-line
  }, [id]);

  if (isLoading) return <Typography variant='h2'>Loading...</Typography>;

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
        <Typography variant='h2' sx={{ fontSize: '2rem', fontWeight: 600 }}>
          {product.name}
        </Typography>
        <Divider sx={{ mb: 2 }} />
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
    <Typography variant='h2'>Product NotFound</Typography>
  );
};
