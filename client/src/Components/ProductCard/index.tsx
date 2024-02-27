import { Link } from 'react-router-dom';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import { IProductCardProps } from '../../@Types';
import { currencyFormat } from '../../Utils';

export const ProductCard = ({
  id,
  name,
  price,
  pictureUrl,
  type,
  brand,
  quantityInStock,
}: IProductCardProps) => {
  const destiny = `/product/${id}`;
  return quantityInStock > 0 ? (
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
          <Button onClick={() => console.log(`Click to add to cart: ${id}`)}>
            ADD to cart
          </Button>
          <Button component={Link} to={destiny}>
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ) : null;
};
