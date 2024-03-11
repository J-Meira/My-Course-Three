import { useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';

import { PageTitle } from '../../Components';

import { AddressForm } from './AddressForm';
import { PaymentForm } from './PaymentForm';
import { Review } from './Review';

import { validationSchema } from './validationSchema';

import { useAppDispatch } from '../../Redux/Hooks';
import { clearBasket, removeLoading, setLoading } from '../../Redux/Slices';
import { authServices, orderServices } from '../../Services';

const steps = ['Shipping address', 'Review your order', 'Payment details'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    case 2:
      return <PaymentForm />;
    default:
      throw new Error('Unknown step');
  }
}

export const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const dispatch = useAppDispatch();

  const currentValidationSchema = validationSchema[activeStep];

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(currentValidationSchema),
  });

  const handleNext = (data: FieldValues) => {
    if (activeStep === steps.length - 1) {
      console.log(data);
      dispatch(setLoading('pendingOrder'));
      orderServices
        .createOrder({
          saveAddress: !!data.saveAddress,
          shippingAddress: {
            fullName: data.fullName || '',
            address1: data.address1 || '',
            address2: data.address2 || '',
            city: data.city || '',
            state: data.state || '',
            zip: data.zip || '',
            country: data.country || '',
          },
        })
        .catch(console.log)
        .then((r) => {
          if (r) setOrderNumber(r);
          dispatch(clearBasket());
          setActiveStep(activeStep + 1);
        })
        .finally(() => dispatch(removeLoading('pendingOrder')));
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    authServices.getAddress().then((r) => {
      if (r) methods.reset({ ...methods.getValues, ...r, saveAddress: false });
    });
  }, [methods]);

  return (
    <FormProvider {...methods}>
      <PageTitle title='Checkout' />
      <Paper
        variant='outlined'
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant='h5' gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant='subtitle1'>
                Your order number is #{orderNumber}. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </>
          ) : (
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  disabled={!methods.formState.isValid}
                  variant='contained'
                  type='submit'
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </form>
          )}
        </>
      </Paper>
    </FormProvider>
  );
};
