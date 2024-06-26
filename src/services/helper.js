import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const fetchCartFromFirestore = async (userId) => {
  if (!userId) {
    throw new Error("User ID is undefined");
  }

  const ref = doc(db, "cartItems", userId);
  const docSnap = await getDoc(ref);

  console.log(`Fetching cart for userId: ${userId}`);

  if (!docSnap.exists()) {
    console.log("No cart document found for userId:", userId);
    return []; // Return an empty array if the document does not exist
  }

  const data = docSnap.data();
  console.log(data, "datafrom firestore");
  const firestoreCartArray = Object.values(data);
  return firestoreCartArray || [];
};

export const saveCartToFirestore = async (userId, cart) => {
  if (!userId) {
    throw new Error("User ID is undefined");
  }
  const ref = doc(db, "cartItems", userId);
  await setDoc(ref, { ...cart });
};

// export const saveCart = createAsyncThunk(
//   "cart/saveCart",
//   async ({ userId, cart }) => {
//     await saveCartToFirestore(userId, cart);
//   }
// );

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
  if (!user || !user.uid) {
    throw new Error("Invalid user object or user ID");
  }

  const firestoreCart = await fetchCartFromFirestore(user.uid);
  console.log(firestoreCart, "doctype");
  const localCart = loadCartFromLocalStorage() || [];
  console.log(localCart, "localcart");

  const mergedCart = [...localCart, ...firestoreCart];
  console.log(mergedCart, "doctype>>");
  return filterDuplicateItems(mergedCart);
};

export const ratepercents = (rate) => {
  return rate.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};

const filterDuplicateItems = (cartItems) => {
  // Use an object to track unique items by id
  const uniqueItemsMap = cartItems.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  // Convert the object values back to an array
  const uniqueItemsArray = Object.values(uniqueItemsMap);

  return uniqueItemsArray;
};
