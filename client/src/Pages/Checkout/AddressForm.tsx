import { Typography, Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { CheckInput, TextInput } from '../../Components';

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
        <CheckInput
          control={control}
          name='saveAddress'
          label='Save this as the default address'
          grid={{ sm: 12 }}
        />
      </Grid>
    </>
  );
};
