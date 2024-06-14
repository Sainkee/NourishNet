import {
  saveCartToFirestore,
  saveCartToLocalStorage,
} from "../services/helper";
import authSlice from "./authSlice";
import {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  updateCart,
} from "./cartSlice";

export const cartMiddleware = (store) => (next) => async (action) => {
  const result = next(action);
  const state = store.getState();
  const userId = state.auth?.user?.uid;

  if (
    [
      addToCart.type,
      removeFromCart.type,
      clearCart.type,
      incrementQuantity.type,
      decrementQuantity.type,
      updateCart.type,
    ].includes(action.type)
  ) {
    if (userId) {
      await saveCartToFirestore(userId, state.cart.cart);
    } else {
      saveCartToLocalStorage(state.cart.cart);
    }
  }

  return result;
};
