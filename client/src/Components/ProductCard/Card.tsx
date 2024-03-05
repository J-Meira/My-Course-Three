import { Link } from 'react-router-dom';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { MdAddShoppingCart, MdVisibility } from 'react-icons/md';

import { IProductCardProps } from '../../@Types';
import { currencyFormat } from '../../Utils';
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks';
import { addBasketItem } from '../../Redux/Slices';

export const ProductCard = ({
  id,
  name,
  price,
  pictureUrl,
  type,
  brand,
}: IProductCardProps) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.basket.status);
  const destiny = `/product/${id}`;

  const isLoading = () => status === 'pendingAddItem' + id;

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardHeader
          title={name}
          component={Link}
          to={destiny}
          sx={{
            textDecoration: 'none',
          }}
          titleTypographyProps={{
            sx: {
              fontSize: '1rem',
              fontWeight: 600,
              color: 'primary.main',
            },
          }}
        />
        <CardMedia
          component={Link}
          to={destiny}
          image={pictureUrl}
          title={name}
          sx={{
            height: 140,
            backgroundSize: 'contain',
          }}
        />
        <CardContent>
          <Typography variant='button'>
            {type}/{brand}
          </Typography>
          <Typography
            gutterBottom
            color='secondary'
            variant='h6'
            component='div'
          >
            $ {currencyFormat(price)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            disabled={isLoading()}
            onClick={() => dispatch(addBasketItem({ productId: id }))}
          >
            {isLoading() ? (
              <CircularProgress size='1rem' />
            ) : (
              <MdAddShoppingCart />
            )}
            <Typography sx={{ ml: 1 }} variant='button'>
              ADD to cart
            </Typography>
          </Button>
          <Button component={Link} to={destiny}>
            <MdVisibility />
            <Typography sx={{ ml: 1 }} variant='button'>
              View
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
