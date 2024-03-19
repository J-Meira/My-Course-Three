import { Grid } from '@mui/material';

import { ProductCard, ProductCardSkeleton } from '../../Components';

import { useProducts } from '../../Utils';

export const List = () => {
  const { products, productsLoaded } = useProducts();

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
