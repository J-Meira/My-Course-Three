import { object, string } from 'yup';

export const validationSchema = [
  object({
    fullName: string().required('Full name is required'),
    address1: string().required('Addres line 1 is required'),
    address2: string().required(),
    city: string().required(),
    state: string().required(),
    zip: string().required(),
    country: string().required(),
  }),
  object(),
  object({
    nameOnCard: string().required(),
  }),
];
