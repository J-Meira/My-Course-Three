import { Grid } from '@mui/material';
import { IProductsListProps } from '../../@Types';
import { ProductCard, ProductCardSkeleton } from '../../Components';
import { useAppSelector } from '../../Redux';

export const List = ({ products }: IProductsListProps) => {
  const { productsLoaded } = useAppSelector((state) => state.products);
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
