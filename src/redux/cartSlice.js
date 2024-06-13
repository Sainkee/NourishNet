import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCartFromFirestore,
  saveCartToFirestore,
  saveCartToLocalStorage,
} from "../services/helper";

const initialState = {
  cart: [],
 
};

// export const fetchCart = createAsyncThunk(
//   'cart/fetchCart',
//   async (userId, thunkAPI) => {
//     try {
//       const cart = await fetchCartFromFirestore(userId);
//       return cart;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error.message });
//     }
//   }
// );

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      const { cartItem, userId } = action.payload;
      state.cart = cartItem;

      if (userId) {
        saveCartToFirestore(userId, state.cart);
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.status = "idle";
      state.error = null;
    },
    addToCart: (state, action) => {

      const { cartItem, userId } = action.payload;
      console.log(cartItem, userId,"/.");
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
      console.log(action.payload);
      const { id, userId } = action.payload;

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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchCart.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(fetchCart.fulfilled, (state, action) => {
  //       state.status = 'succeeded';
  //       state.cart = action.payload;
  //     })
  //     .addCase(fetchCart.rejected, (state, action) => {
  //       state.status = 'failed';
  //       state.error = action.payload.error;
  //     });
  // },
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
