import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Box, Typography } from '@mui/material';

import { Loading, PageTitle } from '../../Components';

import { BasketTable } from './BasketTable';
import { BasketSummary } from './BasketSummary';

import { IBasket } from '../../@Types';
import { basketServices } from '../../Services';

export const BasketPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState<IBasket | null>(null);

  useEffect(() => {
    basketServices
      .getBasket()
      .then((r) => setBasket(r))
      .catch(console.log)
      .finally(() => setIsLoading(false));

    // eslint-disable-next-line
  }, []);

  if (isLoading) return <Loading message='loading basket...' />;
  return (
    <>
      <PageTitle title='Basket' />
      {basket ? (
        <>
          <BasketTable items={basket.items} isBasket />
          <Box display='flex' flexDirection='column' alignItems='flex-end'>
            <BasketSummary items={basket.items} />
            <Button
              component={Link}
              to='/checkout'
              variant='contained'
              size='large'
              sx={{ mt: 2, width: '100%', maxWidth: 365 }}
            >
              Checkout
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant='body1'>Basket is empty!</Typography>
      )}
    </>
  );
};
