import { createSlice } from "@reduxjs/toolkit";
import { saveCartToFirestore, saveCartToLocalStorage } from "../services/helper";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      const { cartItem, userId } = action.payload;
      console.log(cartItem);
      state.cart = cartItem || []; // Ensure cartItem is always an array

      if (userId) {
        saveCartToFirestore(userId, state.cart);
      }
    },
    resetCart: (state) => {
      state.cart = [];
    },
    addToCart: (state, action) => {
      const { cartItem, userId } = action.payload;

      if (!Array.isArray(state.cart)) {
        state.cart = []; // Ensure cart is an array
      }

      const item = state.cart.find((item) => item.id === cartItem.id);
      if (item) {
        item.quantity++;
      } else {
        state.cart.push({ ...cartItem, quantity: 1 });
      }
      if (userId) {
        saveCartToFirestore(userId, state.cart);
      } else {
        saveCartToLocalStorage(state.cart);
      }
    },
    removeFromCart: (state, action) => {
      const { id, userId } = action.payload;

      if (!Array.isArray(state.cart)) {
        state.cart = []; // Ensure cart is an array
      }

      state.cart = state.cart.filter((item) => item.id !== id);
      if (userId) {
        saveCartToFirestore(userId, state.cart);
      } else {
        saveCartToLocalStorage(state.cart);
      }
    },
    clearCart: (state, action) => {
      const { userId } = action.payload;
      state.cart = [];
      if (userId) {
        saveCartToFirestore(userId, state.cart);
      } else {
        saveCartToLocalStorage(state.cart);
      }
    },
    incrementQuantity: (state, action) => {
      const { id, userId } = action.payload;

      if (!Array.isArray(state.cart)) {
        state.cart = []; // Ensure cart is an array
      }

      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.quantity++;
      }
      if (userId) {
        saveCartToFirestore(userId, state.cart);
      } else {
        saveCartToLocalStorage(state.cart);
      }
    },
    decrementQuantity: (state, action) => {
      const { id, userId } = action.payload;

      if (!Array.isArray(state.cart)) {
        state.cart = []; // Ensure cart is an array
      }

      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.quantity--;
        if (item.quantity === 0) {
          state.cart = state.cart.filter((item) => item.id !== id);
        }
      }
      if (userId) {
        saveCartToFirestore(userId, state.cart);
      } else {
        saveCartToLocalStorage(state.cart);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  resetCart,
  updateCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice;
