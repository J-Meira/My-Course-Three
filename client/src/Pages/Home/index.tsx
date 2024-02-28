import { useState, useEffect } from 'react';

import { Grid } from '@mui/material';

import { Loading, ProductCard } from '../../Components';

import { IProduct } from '../../@Types';
import { productServices } from '../../Services';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    productServices
      .getAll()
      .then((r) => setProducts(r))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Grid container spacing={4}>
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </Grid>
  );
};
