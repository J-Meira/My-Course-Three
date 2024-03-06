import { configureStore } from '@reduxjs/toolkit';
import { authSlice, basketSlice, productsSlice, systemSlice } from './Slices';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    basket: basketSlice.reducer,
    products: productsSlice.reducer,
    system: systemSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
