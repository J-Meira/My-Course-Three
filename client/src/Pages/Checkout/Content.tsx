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

import {
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { StripeElementType } from '@stripe/stripe-js';

import { PageTitle } from '../../Components';

import { AddressForm } from './AddressForm';
import { PaymentForm } from './PaymentForm';
import { Review } from './Review';

import { validationSchema } from './validationSchema';

import { useAppDispatch, useAppSelector } from '../../Redux/Hooks';
import { clearBasket, removeLoading, setLoading } from '../../Redux/Slices';
import { authServices, orderServices } from '../../Services';
import { ICardComplete } from '../../@Types';

const steps = ['Shipping address', 'Review your order', 'Payment details'];

export const Content = () => {
  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const basket = useAppSelector((state) => state.basket.current);
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [cardState, setCardState] = useState<{
    elementError: { [key in StripeElementType]?: string };
  }>({ elementError: {} });
  const [cardComplete, setCardComplete] = useState<ICardComplete>({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });

  const currentValidationSchema = validationSchema[activeStep];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <Review />;
      case 2:
        return (
          <PaymentForm
            cardState={cardState}
            onCardInputChange={onCardInputChange}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCardInputChange = (event: any) => {
    setCardState({
      ...cardState,
      elementError: {
        ...cardState.elementError,
        [event.elementType]: event.error?.message,
      },
    });
    setCardComplete({ ...cardComplete, [event.elementType]: event.complete });
  };

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(currentValidationSchema),
  });

  const submitOrder = async (data: FieldValues) => {
    if (!basket?.clientSecret || !stripe || !elements) return;
    try {
      dispatch(setLoading('pendingOrder'));
      const cardElement = elements.getElement(CardNumberElement);
      const paymentResult = await stripe.confirmCardPayment(
        basket.clientSecret,
        {
          payment_method: {
            card: cardElement!,
            billing_details: {
              name: data.nameOnCard,
            },
          },
        },
      );
      console.log(paymentResult);
      if (paymentResult.paymentIntent?.status === 'succeeded') {
        const r = await orderServices.createOrder({
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
        });

        dispatch(removeLoading('pendingOrder'));
        if (r) setOrderNumber(r);
        dispatch(clearBasket());
        setPaymentSucceeded(true);
        setPaymentMessage('Thank you - we have received your payment');
        setActiveStep(activeStep + 1);
      } else {
        dispatch(removeLoading('pendingOrder'));
        setPaymentMessage(paymentResult.error?.message || 'Payment failed');
        setPaymentSucceeded(false);

        setActiveStep(activeStep + 1);
      }
    } catch (error) {
      console.log(error);
      dispatch(removeLoading('pendingOrder'));
    }
  };

  const handleNext = async (data: FieldValues) => {
    if (activeStep === steps.length - 1) {
      console.log(data);
      await submitOrder(data);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const submitDisabled = (): boolean => {
    if (activeStep === steps.length - 1) {
      return (
        !cardComplete.cardCvc ||
        !cardComplete.cardExpiry ||
        !cardComplete.cardNumber ||
        !methods.formState.isValid
      );
    } else {
      return !methods.formState.isValid;
    }
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
                {paymentMessage}
              </Typography>
              {paymentSucceeded ? (
                <Typography variant='subtitle1'>
                  Your order number is #{orderNumber}. We have not emailed your
                  order confirmation, and will not send you an update when your
                  order has shipped as this is a fake store!
                </Typography>
              ) : (
                <Button variant='contained' onClick={handleBack}>
                  Go back and try again
                </Button>
              )}
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
                  disabled={submitDisabled()}
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
