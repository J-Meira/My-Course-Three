import { useState, useEffect } from 'react';
import axios from 'axios';

import { Grid, Typography } from '@mui/material';

import { ProductCard } from '../../Components';

import { IProduct } from '../../@Types';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/product`)
      .then((r) => setProducts(r.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line
  }, []);

  if (isLoading) return <Typography variant='h2'>Loading...</Typography>;

  return (
    <Grid container spacing={4}>
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </Grid>
  );
};
