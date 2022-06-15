import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./slice/authSlice";
import categoryReducer from "./slice/categorySlice";
import modalReducer from "./slice/modalSlice";
import cartReducer from "./slice/cartSlice";
import productReducer from "./slice/productSlice";
import userReducer from "./slice/userSlice";
import brandReducer from "./slice/brandSlice";
import lookbookReducer from './slice/lookbookSlice';

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  category: categoryReducer,
  modal: modalReducer,
  product: productReducer,
  user: userReducer,
  brand: brandReducer,
  lookbook: lookbookReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
