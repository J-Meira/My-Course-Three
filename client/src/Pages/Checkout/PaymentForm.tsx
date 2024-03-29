import { Typography, Grid, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';

import { StripeInput, TextInput } from '../../Components';

import { IPaymentFormProps } from '../../@Types';

export const PaymentForm = ({
  cardState,
  onCardInputChange,
}: IPaymentFormProps) => {
  const { control } = useFormContext();
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <TextInput
          name='nameOnCard'
          label='Name on card'
          autoComplete='cc-name'
          control={control}
        />
        <Grid item xs={12} md={6}>
          <TextField
            className='input-dark'
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardNumber}
            helperText={cardState.elementError.cardNumber}
            id='cardNumber'
            label='Card number'
            fullWidth
            autoComplete='cc-number'
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardNumberElement,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardExpiry}
            helperText={cardState.elementError.cardExpiry}
            id='expDate'
            label='Expiry date'
            fullWidth
            autoComplete='cc-exp'
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardExpiryElement,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardCvc}
            helperText={cardState.elementError.cardCvc}
            id='cvv'
            label='CVV'
            fullWidth
            autoComplete='cc-csc'
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardCvcElement,
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};
