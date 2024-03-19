import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';

import { IAuthState, IUser } from '../../@Types';
import { authServices } from '../../Services';
import { router } from '../../Router';
import { useToast } from '../../Utils';
import { removeLoading, setBasket, setLoading } from '.';

const initialState: IAuthState = {
  user: null,
};

export const signIn = createAsyncThunk<IUser, FieldValues>(
  'auth/signIn',
  async (data, thunkAPI) => {
    try {
      const userDto = await authServices.signIn({
        userName: data.userName,
        password: data.password,
      });
      const { basket, ...user } = userDto;
      if (basket) thunkAPI.dispatch(setBasket(basket));
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: true });
    }
  },
);

export const getUser = createAsyncThunk<IUser>(
  'auth/getUser',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading('pendingGetUser'));
      thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
      const userDto = await authServices.getUser();
      const { basket, ...user } = userDto;
      if (basket) thunkAPI.dispatch(setBasket(basket));
      localStorage.setItem('user', JSON.stringify(user));
      thunkAPI.dispatch(removeLoading('pendingGetUser'));
      return user;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(removeLoading('pendingGetUser'));
      return thunkAPI.rejectWithValue({ error: true });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem('user')) return false;
    },
  },
);

const getRoles = (user: IUser): IUser => {
  const claims = JSON.parse(atob(user.token.split('.')[1]));
  const roles =
    claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  return {
    ...user,
    roles: typeof roles === 'string' ? [roles] : roles,
  };
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      localStorage.removeItem('user');
      state.user = null;
      router.navigate('/');
    },
    setUser: (state, action) => {
      state.user = getRoles(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem('user');
      useToast.error('Session expired - please login again');
      router.navigate('/');
    });
    builder.addMatcher(
      isAnyOf(signIn.fulfilled, getUser.fulfilled),
      (state, action) => {
        state.user = getRoles(action.payload);
      },
    );
    builder.addMatcher(isAnyOf(signIn.rejected), (_, action) => {
      throw action.payload;
    });
  },
});

export const { signOut, setUser } = authSlice.actions;
