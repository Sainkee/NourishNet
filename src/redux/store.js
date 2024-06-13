import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'], // Specify which slices you want to persist
};

const rootReducer = {
  [authSlice.name]: authSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
