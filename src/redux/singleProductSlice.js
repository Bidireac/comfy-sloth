import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { single_product_url as url } from '../utils/constants';

export const getSingleProduct = createAsyncThunk(
  'singleProduct/fetchProduct',
  async (id) => {
    const response = await axios.get(`${url}${id}`);
    return response.data;
  }
);

export const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState: {
    product: [],
    pending: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getSingleProduct.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [getSingleProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.pending = false;
    },
    [getSingleProduct.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export default singleProductSlice.reducer;
