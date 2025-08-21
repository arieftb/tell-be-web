import {
  createAsyncThunk, createSlice,
} from '@reduxjs/toolkit';
import AllThreadsUseCase from
  '../../../application/thread/GetAllThreadsUseCase.js';
import ThreadDetailUseCase from
  '../../../application/thread/GetThreadDetailUseCase.js';
import CommentUseCase from
  '../../../application/thread/SubmitCommentUseCase.js';
import {
  SubmitThreadUseCase,
} from '../../../application/thread/SubmitThreadUseCase.js';
import {
  ThreadRepository,
} from '../../../data/persistence/thread/ThreadRepository.js';
import {
  AuthRepository,
} from '../../../data/persistence/auth/AuthRepository.js';

export const fetchThreads = createAsyncThunk(
    'threads/fetchThreads',
    async (_, {rejectWithValue}) => {
      try {
        const getAllThreadsUseCase = new AllThreadsUseCase();
        return await getAllThreadsUseCase.execute();
      } catch (error) {
        const errorMessage = error.message || 'Failed to fetch threads';
        return rejectWithValue(errorMessage);
      }
    },
);

export const fetchThreadDetail = createAsyncThunk(
    'threads/fetchThreadDetail',
    async (threadId, {rejectWithValue}) => {
      try {
        const getThreadDetailUseCase = new ThreadDetailUseCase();
        return await getThreadDetailUseCase.execute(threadId);
      } catch (error) {
        const errorMessage = error.message || 'Failed to fetch thread detail';
        return rejectWithValue(errorMessage);
      }
    },
);

export const submitComment = createAsyncThunk(
    'threads/submitComment',
    async (commentData, {rejectWithValue}) => {
      try {
        const submitCommentUseCase = new CommentUseCase();
        return await submitCommentUseCase.execute(commentData);
      } catch (error) {
        const errorMessage = error.message || 'Failed to submit comment';
        return rejectWithValue(errorMessage);
      }
    },
);

export const submitThread = createAsyncThunk(
    'threads/submitThread',
    async (threadData, {rejectWithValue}) => {
      try {
        const threadRepository = new ThreadRepository();
        const authRepository = new AuthRepository();
        const submitThreadUseCase =
          new SubmitThreadUseCase(threadRepository, authRepository);
        return await submitThreadUseCase.execute(threadData);
      } catch (error) {
        const errorMessage = error.message || 'Failed to submit thread';
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
    submitThreadStatus: 'idle',
    submitThreadError: null,
    selectedCategory: null,
    categories: [],
  },
  reducers: {
    resetSubmitThreadStatus: (state) => {
      state.submitThreadStatus = 'idle';
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchThreads.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchThreads.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.threads = action.payload;
          state.error = null;
          const uniqueCategories = [...new Set(action.payload.map(
              (thread) => thread.category,
          ))];
          state.categories = uniqueCategories;
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
        })
        .addCase(submitThread.pending, (state) => {
          state.submitThreadStatus = 'loading';
        })
        .addCase(submitThread.fulfilled, (state) => {
          state.submitThreadStatus = 'succeeded';
          state.submitThreadError = null;
          state.status = 'idle';
        })
        .addCase(submitThread.rejected, (state, action) => {
          state.submitThreadStatus = 'failed';
          state.submitThreadError = action.payload;
        });
  },
});

export const {resetSubmitThreadStatus, setSelectedCategory} =
  threadSlice.actions;

export const selectAllThreads = (state) => {
  const {threads, selectedCategory} = state.threads;
  if (selectedCategory) {
    return threads.filter((thread) => thread.category === selectedCategory);
  }
  return threads;
};
export const selectThreadsStatus = (state) => state.threads.status;
export const selectThreadsError = (state) => state.threads.error;
export const selectDetailThread = (state) => state.threads.detailThread;
export const selectDetailThreadStatus = (state) =>
  state.threads.detailThreadStatus;
export const selectDetailThreadError = (state) =>
  state.threads.detailThreadError;
export const selectSubmitCommentStatus = (state) =>
  state.threads.submitCommentStatus;
export const selectSubmitCommentError = (state) =>
  state.threads.submitCommentError;
export const selectSubmitThreadStatus = (state) =>
  state.threads.submitThreadStatus;
export const selectSubmitThreadError = (state) =>
  state.threads.submitThreadError;
export const selectCategories = (state) => state.threads.categories;
export const selectSelectedCategory = (state) => state.threads.selectedCategory;

export default threadSlice.reducer;
