import { Typography } from '@mui/material';

import { BasketContent, PageTitle } from '../../Components';

import { useAppSelector } from '../../Redux/Hooks';

export const BasketPage = () => {
  const basket = useAppSelector((state) => state.basket.current);

  return (
    <>
      <PageTitle title='Basket' />
      {basket ? (
        <BasketContent items={basket.items} isBasket />
      ) : (
        <Typography variant='body1'>Basket is empty!</Typography>
      )}
    </>
  );
};
