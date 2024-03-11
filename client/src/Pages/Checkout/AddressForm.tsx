import { Typography, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { TextInput } from '../../Components';

export const AddressForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <TextInput
          control={control}
          name='fullName'
          label='Full Name'
          grid={{ sm: 12 }}
        />
        <TextInput
          control={control}
          name='address1'
          label='Address 1'
          grid={{ sm: 12 }}
        />
        <TextInput
          control={control}
          name='address2'
          label='Address 2'
          grid={{ sm: 12 }}
        />
        <TextInput control={control} name='city' label='City' />
        <TextInput control={control} name='state' label='State' />
        <TextInput control={control} name='zip' label='Zip' />
        <TextInput control={control} name='country' label='Country' />
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color='secondary' name='saveAddress' value='yes' />
            }
            label='Use this address for payment details'
          />
        </Grid>
      </Grid>
    </>
  );
};
