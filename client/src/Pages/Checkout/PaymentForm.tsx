import {
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { TextInput } from '../../Components';

export const PaymentForm = () => {
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
            id='cardNumber'
            label='Card number'
            fullWidth
            autoComplete='cc-number'
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id='expDate'
            label='Expiry date'
            fullWidth
            autoComplete='cc-exp'
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id='cvv'
            label='CVV'
            helperText='Last three digits on signature strip'
            fullWidth
            autoComplete='cc-csc'
            variant='standard'
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color='secondary' name='saveCard' value='yes' />}
            label='Remember credit card details for next time'
          />
        </Grid>
      </Grid>
    </>
  );
};
