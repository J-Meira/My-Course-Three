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

import { IProductCardProps } from '../../@Types';
import { currencyFormat } from '../../Utils';
import { useState } from 'react';
import { basketServices } from '../../Services';
import { MdAddShoppingCart, MdVisibility } from 'react-icons/md';

export const ProductCard = ({
  id,
  name,
  price,
  pictureUrl,
  type,
  brand,
}: IProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const destiny = `/product/${id}`;

  const addItem = (id: number) => {
    setIsLoading(true);
    basketServices
      .addItem({ productId: id, quantity: 1 })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
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
          <Button disabled={isLoading} onClick={() => addItem(id)}>
            {isLoading ? (
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
