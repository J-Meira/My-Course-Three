import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { removeLoading, setLoading } from '.';
import { RootState } from '..';
import { IProduct, IProductParams, IProductsState } from '../../@Types';
import { productServices } from '../../Services';

const productsAdapter = createEntityAdapter<IProduct>();

const initialParams: IProductParams = {
  pageNumber: 1,
  pageSize: 6,
  orderBy: 'name',
  brands: [],
  types: [],
};

export const getAllProducts = createAsyncThunk<
  IProduct[],
  void,
  { state: RootState }
>('products/getAllProducts', async (_, thunkAPI) => {
  try {
    const params = thunkAPI.getState().products.productParams;
    const response = await productServices.getAll(params);
    thunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const getProductById = createAsyncThunk<IProduct, number>(
  'products/getProductById',
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

export const getFilters = createAsyncThunk(
  'products/getFilters',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading('pendingFilters'));
      const response = await productServices.getFilters();
      thunkAPI.dispatch(removeLoading('pendingFilters'));
      return response;
    } catch (error) {
      thunkAPI.dispatch(removeLoading('pendingFilters'));
      return thunkAPI.rejectWithValue({ error });
    }
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState<IProductsState>({
    productsLoaded: false,
    filtersLoaded: false,
    brands: [],
    types: [],
    productParams: initialParams,
    metaData: null,
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        pageNumber: action.payload,
      };
    },
    resetProductParams: (state) => {
      state.productParams = initialParams;
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.productsLoaded = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(getFilters.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.filtersLoaded = true;
    });
  },
});

export const {
  setProductParams,
  setPageNumber,
  resetProductParams,
  setMetaData,
} = productsSlice.actions;

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.products,
);
