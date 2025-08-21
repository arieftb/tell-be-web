import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../presentation/redux/auth/authSlice.js';
import threadReducer from '../presentation/redux/thread/threadSlice.js';
import leaderboardReducer from
  '../presentation/redux/leaderboard/leaderboardSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadReducer,
    leaderboards: leaderboardReducer,
  },
});
