import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { products_url as url } from '../utils/constants';

export const getProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(url);
    return response.data;
  }
);
export const getFeaturedProducts = createAsyncThunk(
  'featuredProducts/fetchProducts',
  async () => {
    const response = await axios.get(url);
    const featured_products = response.data.filter(
      (product) => product.featured === true
    );
    return featured_products;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    featured_products: [],
    pending: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.pending = false;
    },
    [getProducts.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
    [getFeaturedProducts.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [getFeaturedProducts.fulfilled]: (state, action) => {
      state.featured_products = action.payload;
      state.pending = false;
    },
    [getFeaturedProducts.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export default productsSlice.reducer;
