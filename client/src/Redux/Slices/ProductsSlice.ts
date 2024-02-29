import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { removeLoading, setLoading } from '.';
import { RootState } from '..';
import { IProduct, IProductsState } from '../../@Types';
import { productServices } from '../../Services';

const productsAdapter = createEntityAdapter<IProduct>();

export const getAllProducts = createAsyncThunk<
  IProduct[],
  void,
  { state: RootState }
>('catalog/fetchProductsAsync', async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading('pendingProducts'));
    const response = await productServices.getAll();
    thunkAPI.dispatch(removeLoading('pendingProducts'));
    return response;
  } catch (error) {
    thunkAPI.dispatch(removeLoading('pendingProducts'));
    return thunkAPI.rejectWithValue({ error });
  }
});

export const getProductById = createAsyncThunk<IProduct, number>(
  'catalog/fetchProductAsync',
  async (id, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading('pendingProduct'));
      const product = await productServices.getById(id);
      thunkAPI.dispatch(removeLoading('pendingProduct'));

      if (!product) return thunkAPI.rejectWithValue('error');
      return product;
    } catch (error) {
      thunkAPI.dispatch(removeLoading('pendingProduct'));
      return thunkAPI.rejectWithValue({ error });
    }
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState<IProductsState>({
    productsLoaded: false,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.productsLoaded = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
    });
  },
});

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.products,
);
