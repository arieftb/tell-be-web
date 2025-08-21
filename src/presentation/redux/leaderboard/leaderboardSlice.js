import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import GetLeaderboardsUseCase from
  '../../../application/user/GetLeaderboardsUseCase.js';

export const fetchLeaderboards = createAsyncThunk(
    'leaderboards/fetchLeaderboards',
    async (_, {rejectWithValue}) => {
      try {
        const getLeaderboardsUseCase = new GetLeaderboardsUseCase();
        const leaderboards = await getLeaderboardsUseCase.execute();
        // Convert Leaderboard and LeaderboardUser instances to plain objects
        return leaderboards.map((lb) => ({
          user: {
            id: lb.user.id,
            name: lb.user.name,
            email: lb.user.email,
            avatar: lb.user.avatar,
          },
          score: lb.score,
        }));
      } catch (error) {
        const errorMessage = error.message || 'Failed to fetch leaderboards';
        return rejectWithValue(errorMessage);
      }
    },
);

const leaderboardSlice = createSlice({
  name: 'leaderboards',
  initialState: {
    leaderboards: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchLeaderboards.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchLeaderboards.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.leaderboards = action.payload;
          state.error = null;
        })
        .addCase(fetchLeaderboards.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
          state.leaderboards = [];
        });
  },
});

export const selectAllLeaderboards = (state) => state.leaderboards.leaderboards;
export const selectLeaderboardsStatus = (state) => state.leaderboards.status;
export const selectLeaderboardsError = (state) => state.leaderboards.error;

export default leaderboardSlice.reducer;
