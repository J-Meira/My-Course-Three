import { Typography } from '@mui/material';
import { BasketContent } from '../../Components';
import { useAppSelector } from '../../Redux/Hooks';

export const Review = () => {
  const basket = useAppSelector((state) => state.basket.current);
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      {basket && <BasketContent items={basket.items} />}
    </>
  );
};
