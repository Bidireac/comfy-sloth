import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cartProducts',
  initialState: {
    cart: localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [],
    total_items: 0,
    total_amount: 0,
    shipping_fee: 534,
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, mainColor: color, amount, product } = action.payload;
      const tempItem = state.cart.find((i) => i.id === id + color);
      if (tempItem) {
        console.log('tempItem', tempItem);
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        state.cart = tempCart;
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        state.cart = [...state.cart, newItem];
      }
      console.log('state.cart', state.cart);
    },
    removeItem: (state, action) => {
      const tempCart = state.cart.filter((item) => item.id !== action.payload);
      state.cart = tempCart;
    },
    toggleAmount: (state, action) => {
      const { id, value } = action.payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          if (value === 'inc') {
            let newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, amount: newAmount };
          }
          if (value === 'dec') {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        } else {
          return item;
        }
      });

      state.cart = tempCart;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    cartTotals: (state) => {
      const { total_items, total_amount } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;

          total.total_items += amount;
          total.total_amount += price * amount;
          return total;
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      );
      state.total_items = total_items;
      state.total_amount = total_amount;
    },
  },
});

export const { addToCart, removeItem, toggleAmount, clearCart, cartTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
