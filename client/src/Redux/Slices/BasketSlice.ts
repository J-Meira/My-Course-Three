import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IBasket, IBasketItemUpdateAction, IBasketState } from '../../@Types';
import { basketServices } from '../../Services';
import { useCookies } from '../../Utils';
import { removeLoading, setLoading } from '.';

const initialState: IBasketState = {
  current: null,
  status: 'idle',
};

export const getBasket = createAsyncThunk<IBasket | null>(
  'basket/getBasket',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading('pendingBasket'));
      const response = await basketServices.getBasket();
      thunkAPI.dispatch(removeLoading('pendingBasket'));
      return response;
    } catch (error) {
      thunkAPI.dispatch(removeLoading('pendingBasket'));
      return thunkAPI.rejectWithValue({ error });
    }
  },
);

export const addBasketItem = createAsyncThunk<
  IBasket | null,
  IBasketItemUpdateAction
>('basket/addBasketItem', async (payload, thunkAPI) => {
  try {
    return await basketServices.addItem({
      ...payload,
      quantity: payload.quantity || 1,
    });
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const removeBasketItem = createAsyncThunk<void, IBasketItemUpdateAction>(
  'basket/removeBasketItem',
  async (payload, thunkAPI) => {
    try {
      await basketServices.removeItem({
        ...payload,
        quantity: payload.quantity || 1,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  },
);

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    clearBasket: (state) => {
      state.current = null;
      useCookies.remove('buyerId');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItem.pending, (state, action) => {
      state.status = 'pendingAddItem' + action.meta.arg.productId;
    });
    builder.addCase(removeBasketItem.pending, (state, action) => {
      const type = action.meta.arg.quantity ? 'Delete' : 'Remove';
      state.status = `pending${type}Item${action.meta.arg.productId}`;
    });
    builder.addCase(addBasketItem.fulfilled, (state, action) => {
      state.current = action.payload;
      state.status = 'idle';
    });
    builder.addCase(removeBasketItem.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.current?.items.findIndex(
        (i) => i.productId === productId,
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.current!.items[itemIndex].quantity -= quantity || 1;
      if (state.current?.items[itemIndex].quantity === 0)
        state.current.items.splice(itemIndex, 1);
      state.status = 'idle';
    });
    builder.addCase(getBasket.fulfilled, (state, action) => {
      state.current = action.payload;
    });
    builder.addCase(addBasketItem.rejected, (state, action) => {
      state.status = 'idle';
      console.log(action.payload);
    });
    builder.addCase(removeBasketItem.rejected, (state, action) => {
      state.status = 'idle';
      console.log(action.payload);
    });
    builder.addCase(getBasket.rejected, (action) => {
      console.log(action);
    });
  },
});

export const { clearBasket } = basketSlice.actions;
