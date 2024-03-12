import { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { Content } from './Content';

import { useAppDispatch } from '../../Redux/Hooks';
import { removeLoading, setBasket, setLoading } from '../../Redux/Slices';
import { paymentServices } from '../../Services';

const stripePromise = loadStripe(
  'pk_test_51OtF2AEwqcTVeFHn3XbPe9jmF4Fqv1d7n8I1xSV8v3Ia1dzEhrYBJvypc5JUQn3L5PtSvLsRGYWcuZptsWoMYWAJ00LXNs2QTX',
);

export const CheckoutPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading('pendingPaymentIntent'));
    paymentServices
      .postIntent()
      .then((response) => dispatch(setBasket(response)))
      .catch((error) => console.log(error))
      .finally(() => dispatch(removeLoading('pendingPaymentIntent')));
  }, [dispatch]);

  return (
    <Elements stripe={stripePromise}>
      <Content />
    </Elements>
  );
};
