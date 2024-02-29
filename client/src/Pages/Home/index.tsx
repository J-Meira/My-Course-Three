import { useEffect } from 'react';

import { Grid } from '@mui/material';

import { ProductCard } from '../../Components';

import { useAppDispatch, useAppSelector } from '../../Redux/Hooks';
import { getAllProducts, productSelectors } from '../../Redux/Slices';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { productsLoaded } = useAppSelector((state) => state.products);
  const products = useAppSelector(productSelectors.selectAll);

  useEffect(() => {
    if (!productsLoaded) dispatch(getAllProducts());
  }, [productsLoaded, dispatch]);

  return (
    <Grid container spacing={4}>
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </Grid>
  );
};
