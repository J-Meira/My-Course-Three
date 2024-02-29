import { Typography } from '@mui/material';

import { PageTitle } from '../../Components';

import { BasketTable } from './BasketTable';
import { BasketSummary } from './BasketSummary';

import { useAppSelector } from '../../Redux/Hooks';

export const BasketPage = () => {
  const basket = useAppSelector((state) => state.basket.current);

  return (
    <>
      <PageTitle title='Basket' />
      {basket ? (
        <>
          <BasketTable items={basket.items} isBasket />
          <BasketSummary items={basket.items} isBasket />
        </>
      ) : (
        <Typography variant='body1'>Basket is empty!</Typography>
      )}
    </>
  );
};
