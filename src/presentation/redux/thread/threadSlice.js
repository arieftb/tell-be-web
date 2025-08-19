import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GetAllThreadsUseCase from '../../../application/thread/GetAllThreadsUseCase.js';

export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (_, { rejectWithValue }) => {
    try {
      const getAllThreadsUseCase = new GetAllThreadsUseCase();
      return await getAllThreadsUseCase.execute();
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch threads';
      return rejectWithValue(errorMessage);
    }
  },
);

const threadSlice = createSlice({
  name: 'threads',
  initialState: {
    threads: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.threads = action.payload;
        state.error = null;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.threads = [];
      });
  },
});

export const selectAllThreads = (state) => state.threads.threads;
export const selectThreadsStatus = (state) => state.threads.status;
export const selectThreadsError = (state) => state.threads.error;

export default threadSlice.reducer;