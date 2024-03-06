import { api } from '.';
import { ISignIn, ISignUp } from '../@Types';

const getUser = () => api.get('account/currentUser');
const signIn = (data: ISignIn) => api.post('account/sign-in', data);
const signUp = (data: ISignUp) => api.post('account/sign-up', data);

export const authServices = {
  getUser,
  signIn,
  signUp,
};
