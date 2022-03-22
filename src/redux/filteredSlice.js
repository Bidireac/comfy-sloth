import { createSlice } from '@reduxjs/toolkit';
import { getUniqueValues } from '../utils/helpers';

export const filteredSlice = createSlice({
  name: 'filteredProducts',
  initialState: {
    filtered_products: [],
    all_products: [],
    grid_view: true,
    sort: 'price-lowest',
    filters: {
      text: '',
      company: 'all',
      category: 'all',
      color: 'all',
      min_price: 0,
      max_price: 0,
      price: 0,
      shipping: false,
    },
    categories: [],
    companies: [],
    colors: [],
  },
  reducers: {
    loadProducts: (state, action) => {
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      state.all_products = action.payload;
      state.filtered_products = action.payload;
      state.filters = {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      };
    },
    loadFilters: (state, action) => {
      state.categories = getUniqueValues(action.payload, 'category');
      state.companies = getUniqueValues(action.payload, 'company');
      state.colors = getUniqueValues(action.payload, 'colors');
    },
    setGridView: (state) => {
      state.grid_view = true;
    },
    setListView: (state) => {
      state.grid_view = false;
    },
    updateSort: (state, action) => {
      state.sort = action.payload;
      let tempProducts = [...state.filtered_products];
      if (state.sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      }
      if (state.sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (state.sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (state.sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      state.filtered_products = tempProducts;
    },
    updateFilters: (state, action) => {
      const name = action.payload.name;
      const value = action.payload.value;
      state.filters = { ...state.filters, [name]: value };
    },
    clearFilters: (state) => {
      state.filters = {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      };
    },
    filterProducts: (state) => {
      const all_products = state.all_products;
      const { text, category, company, color, price, shipping } = state.filters;

      let tempProducts = [...all_products];

      // text
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text);
        });
      }
      // category
      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        );
      }
      // company
      if (company !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        );
      }
      // colors
      if (color !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((c) => c === color);
        });
      }
      // price
      tempProducts = tempProducts.filter((product) => product.price <= price);
      // shipping
      if (shipping) {
        tempProducts = tempProducts.filter(
          (product) => product.shipping === true
        );
      }

      state.filtered_products = tempProducts;
    },
  },
});

export const {
  loadProducts,
  setGridView,
  setListView,
  updateSort,
  sortProducts,
  updateFilters,
  loadFilters,
  clearFilters,
  filterProducts,
} = filteredSlice.actions;

export default filteredSlice.reducer;
