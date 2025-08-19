import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GetAllThreadsUseCase from '../../../application/thread/GetAllThreadsUseCase.js';
import GetThreadDetailUseCase from '../../../application/thread/GetThreadDetailUseCase.js';
import SubmitCommentUseCase from '../../../application/thread/SubmitCommentUseCase.js';

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

export const fetchThreadDetail = createAsyncThunk(
  'threads/fetchThreadDetail',
  async (threadId, { rejectWithValue }) => {
    try {
      const getThreadDetailUseCase = new GetThreadDetailUseCase();
      return await getThreadDetailUseCase.execute(threadId);
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch thread detail';
      return rejectWithValue(errorMessage);
    }
  },
);

export const submitComment = createAsyncThunk(
  'threads/submitComment',
  async (commentData, { rejectWithValue }) => {
    try {
      const submitCommentUseCase = new SubmitCommentUseCase();
      return await submitCommentUseCase.execute(commentData);
    } catch (error) {
      const errorMessage = error.message || 'Failed to submit comment';
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
    detailThread: null,
    detailThreadStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    detailThreadError: null,
    submitCommentStatus: 'idle',
    submitCommentError: null,
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
      })
      .addCase(fetchThreadDetail.pending, (state) => {
        state.detailThreadStatus = 'loading';
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.detailThreadStatus = 'succeeded';
        state.detailThread = action.payload;
        state.detailThreadError = null;
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.detailThreadStatus = 'failed';
        state.detailThreadError = action.payload;
        state.detailThread = null;
      })
      .addCase(submitComment.pending, (state) => {
        state.submitCommentStatus = 'loading';
      })
      .addCase(submitComment.fulfilled, (state, action) => {
        state.submitCommentStatus = 'succeeded';
        state.detailThread = {
          ...state.detailThread,
          comments: [action.payload, ...state.detailThread.comments],
        };
        state.submitCommentError = null;
      })
      .addCase(submitComment.rejected, (state, action) => {
        state.submitCommentStatus = 'failed';
        state.submitCommentError = action.payload;
      });
  },
});

export const selectAllThreads = (state) => state.threads.threads;
export const selectThreadsStatus = (state) => state.threads.status;
export const selectThreadsError = (state) => state.threads.error;
export const selectDetailThread = (state) => state.threads.detailThread;
export const selectDetailThreadStatus = (state) => state.threads.detailThreadStatus;
export const selectDetailThreadError = (state) => state.threads.detailThreadError;
export const selectSubmitCommentStatus = (state) => state.threads.submitCommentStatus;
export const selectSubmitCommentError = (state) => state.threads.submitCommentError;

export default threadSlice.reducer;