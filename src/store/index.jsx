import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../presentation/redux/auth/authSlice";
import threadReducer from "../presentation/redux/thread/threadSlice";

import leaderboardReducer from "../presentation/redux/leaderboard/leaderboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadReducer,
    leaderboards: leaderboardReducer,
  },
});
