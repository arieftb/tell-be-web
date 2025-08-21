import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../presentation/redux/auth/authSlice.js';
import threadReducer from '../presentation/redux/thread/threadSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadReducer,
  },
});
