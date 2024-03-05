import { useEffect } from 'react';
import { Grid } from '@mui/material';

import { ProductCard, ProductCardSkeleton } from '../../Components';

import { useAppDispatch, useAppSelector } from '../../Redux/Hooks';
import { productSelectors, getAllProducts } from '../../Redux/Slices';

export const List = () => {
  const dispatch = useAppDispatch();
  const { productsLoaded } = useAppSelector((state) => state.products);
  const products = useAppSelector(productSelectors.selectAll);

  useEffect(() => {
    if (!productsLoaded) dispatch(getAllProducts());
  }, [productsLoaded, dispatch]);

  return (
    <Grid container spacing={4}>
      {products.map((p) =>
        productsLoaded ? (
          <ProductCard key={p.id} {...p} />
        ) : (
          <ProductCardSkeleton key={p.id} />
        ),
      )}
    </Grid>
  );
};
