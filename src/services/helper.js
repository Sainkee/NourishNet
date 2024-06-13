import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCartFromFirestore = async (userId) => {
    if (!userId) {
      throw new Error("User ID is undefined");
    }
  
    const ref = doc(db, "cartItems", userId);
    const docSnap = await getDoc(ref);
  
    if (!docSnap.exists()) {
      console.log("No such document!");
      return []; // Return an empty array if the document does not exist
    }
  
    const data = docSnap.data();
    if (!data || !data.cart) {
      console.log("Cart data is not available!");
      return []; // Return an empty array if the cart data is not available
    }
  
    console.log(data.cart, ">>>>>>>>>>doctype");
    return data.cart;
  };

export const saveCartToFirestore = async (userId, cart) => {
  if (!userId) {
    throw new Error("User ID is undefined");
  }
  const ref = doc(db, "cartItems", userId);
  await setDoc(ref, { cart });
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const fireCart = await fetchCartFromFirestore(userId);
  return fireCart;
});

export const saveCart = createAsyncThunk(
  "cart/saveCart",
  async ({ userId, cart }) => {
    await saveCartToFirestore(userId, cart);
  }
);

// Helper function to load cart from local storage
export const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");

    if (serializedCart) {
      return JSON.parse(serializedCart);
    }
    return [];
  } catch (e) {
    console.warn("Failed to load cart from local storage", e);
    return [];
  }
};

// Helper function to save cart to local storage
export const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("cart", serializedCart);
  } catch (e) {
    console.warn("Failed to save cart to local storage", e);
  }
};

export const syncfirestore = async (user) => {
  const localCart = loadCartFromLocalStorage() || [];
  const firestoreCart = await fetchCartFromFirestore(user.uid);

  const mergedCart = [...localCart, ...firestoreCart];
  if (localCart.length > 0) {
    localStorage.removeItem("cart");
  }
  return mergedCart;
};

export const ratepercents = (rate) => {
    return rate.toLocaleString(undefined, {
      style: "currency",
      currency: "INR",
      
    });
  };