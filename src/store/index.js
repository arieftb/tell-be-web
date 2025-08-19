import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../presentation/redux/auth/authSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
