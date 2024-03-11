import { api } from '.';
import { IShippingAddress, ISignIn, ISignUp } from '../@Types';

const getAddress = (): Promise<IShippingAddress | void> =>
  api.get('account/savedAddress');
const getUser = () => api.get('account/currentUser');
const signIn = (data: ISignIn) => api.post('account/sign-in', data);
const signUp = (data: ISignUp) => api.post('account/sign-up', data);

export const authServices = {
  getAddress,
  getUser,
  signIn,
  signUp,
};
