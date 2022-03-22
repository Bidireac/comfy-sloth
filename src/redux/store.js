import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import productsReducer from './productsSlice';
import singleProductSlice from './singleProductSlice';
import filteredSlice from './filteredSlice';
import cartSlice from './cartSlice';

export default configureStore({
  reducer: {
    sidebar: sidebarReducer,
    products: productsReducer,
    singleProduct: singleProductSlice,
    filteredProducts: filteredSlice,
    cartProducts: cartSlice,
  },
});
