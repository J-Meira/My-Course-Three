/* eslint-disable @typescript-eslint/no-explicit-any */
import { StripeElementType } from '@stripe/stripe-js';

export interface IPaymentFormProps {
  cardState: { elementError: { [key in StripeElementType]?: string } };
  onCardInputChange: (event: any) => void;
}

export interface ICardComplete {
  cardNumber: boolean;
  cardExpiry: boolean;
  cardCvc: boolean;
}
