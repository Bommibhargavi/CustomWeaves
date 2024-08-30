import { configureStore } from '@reduxjs/toolkit';
import blouseReducer from './blouseSlice';
// import cartReducer from './cartSlice';
import userReducer from './Authslice';

export const store = configureStore({
  reducer: {
    blouse: blouseReducer,
    // cart: cartReducer,
    auth: userReducer,
  },
});
