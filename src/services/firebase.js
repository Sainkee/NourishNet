// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { login, logout } from "../redux/authSlice"; // Ensure the path is correct based on your project structure
import { syncfirestore } from "./helper";
import { updateCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

// Firebase configuration object from your Firebase project settings

const firebaseConfig = {
  apiKey: "AIzaSyBHUTQUalButiNhUDPFVyKQDoCS69fj5pI",
  authDomain: "nourishnet-197b0.firebaseapp.com",
  projectId: "nourishnet-197b0",
  storageBucket: "nourishnet-197b0.appspot.com",
  messagingSenderId: "397068721528",
  appId: "1:397068721528:web:ca6e2a85a2ec569604fc8d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signUpWithEmailPassword = async (email, password, dispatch) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    dispatch(
      login({
        isLoggedIn: true,
        user,
      })
    );
  } catch (error) {
    console.error("Error signing up with email and password:", error);
    throw new Error("Error signing up with email and password");
  }
};

// login========================================================

const signInWithGoogle = async (dispatch) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    dispatch(login(user));
    try {
      const cartItem = await syncfirestore(user);
      console.log("Cart synced successfully:", cartItem);
      dispatch(updateCart({ cartItem: cartItem, userId: user.uid }));
    } catch (syncError) {
      toast.error("Error syncing cart from Firestore:", syncError);
    }
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw new Error("Error signing in with Google");
  }
};

const signInWithEmailPassword = async (email, password, dispatch) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    dispatch(login(user));
    try {
      const cartItem = await syncfirestore(user);
      console.log("Cart synced successfully:", cartItem);
      dispatch(updateCart({ cartItem: cartItem, userId: user.uid }));
    } catch (syncError) {
      toast.error("Error syncing cart from Firestore:", syncError);
    }
  } catch (error) {
    console.error("Error signing in with email and password:", error);
    throw new Error("Error signing in with email and password");
  }
};

const signOutUser = async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
    
  } catch (error) {
    console.error("Error signing out:", error);
    throw new Error("Error signing out");
  }
};

const db = getFirestore(app);
export {
  app,
  auth,
  provider,
  signInWithGoogle,
  signUpWithEmailPassword,
  signInWithEmailPassword,
  signOutUser,
  db,
};
