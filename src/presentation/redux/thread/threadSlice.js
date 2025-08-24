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
import {
  UpVoteThreadUseCase,
} from '../../../application/thread/UpVoteThreadUseCase.js';
import {
  DownVoteUC,
} from '../../../application/thread/DownVoteUC';
import {NeutralVoteThreadUseCase} from
  '../../../application/thread/NeutralVoteThreadUseCase.js';
import {UpVoteCommentUseCase} from
  '../../../application/thread/UpVoteCommentUseCase.js';

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

export const upVoteThread = createAsyncThunk(
    'threads/upVoteThread',
    async (threadId, {rejectWithValue, getState}) => {
      try {
        const upVoteThreadUseCase = new UpVoteThreadUseCase();
        const {threads} = getState().threads;
        const thread = threads.find((t) => t.id === threadId);
        if (thread && thread.isUpVotedByCurrentUser) {
          const neutralVoteThreadUseCase = new NeutralVoteThreadUseCase();
          const vote = await neutralVoteThreadUseCase.execute(threadId);
          return {vote};
        }
        const vote = await upVoteThreadUseCase.execute(threadId);
        return {vote};
      } catch (error) {
        const errorMessage = error.message || 'Failed to up-vote thread';
        return rejectWithValue(errorMessage);
      }
    },
);

export const downVoteThread = createAsyncThunk(
    'threads/downVoteThread',
    async (threadId, {rejectWithValue, getState}) => {
      try {
        const downVoteThreadUseCase = new DownVoteUC();
        const {threads} = getState().threads;
        const thread = threads.find((t) => t.id === threadId);
        if (thread && thread.isDownVotedByCurrentUser) {
          const neutralVoteThreadUseCase = new NeutralVoteThreadUseCase();
          const vote = await neutralVoteThreadUseCase.execute(threadId);
          return {vote};
        }
        const vote = await downVoteThreadUseCase.execute(threadId);
        return {vote};
      } catch (error) {
        const errorMessage = error.message || 'Failed to down-vote thread';
        return rejectWithValue(errorMessage);
      }
    },
);

export const neutralVoteThread = createAsyncThunk(
    'threads/neutralVoteThread',
    async (threadId, {rejectWithValue}) => {
      try {
        const neutralVoteThreadUseCase = new NeutralVoteThreadUseCase();
        const vote = await neutralVoteThreadUseCase.execute(threadId);
        return {vote};
      } catch (error) {
        const errorMessage = error.message || 'Failed to neutral-vote thread';
        return rejectWithValue(errorMessage);
      }
    },
);

export const upVoteComment = createAsyncThunk(
    'threads/upVoteComment',
    async ({threadId, commentId}, {rejectWithValue}) => {
      try {
        const upVoteCommentUseCase = new UpVoteCommentUseCase();
        const result = await upVoteCommentUseCase.execute(threadId, commentId);
        if (result === false) {
          // User not logged in, do nothing as per requirement
          return rejectWithValue('User not logged in');
        }
        const serializableVote = {
          id: result.id,
          userId: result.userId,
          threadId: result.threadId,
          voteType: result.voteType,
        };
        return {vote: serializableVote, commentId, threadId};
      } catch (error) {
        const errorMessage = error.message || 'Failed to up-vote comment';
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
    upVoteStatus: 'idle',
    upVoteError: null,
    downVoteStatus: 'idle',
    downVoteError: null,
    neutralVoteStatus: 'idle',
    neutralVoteError: null,
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
        })
        .addCase(upVoteThread.pending, (state) => {
          state.upVoteStatus = 'loading';
        })
        .addCase(upVoteThread.fulfilled, (state, action) => {
          state.upVoteStatus = 'succeeded';
          const {vote} = action.payload;
          const {userId, threadId} = vote;

          state.threads = state.threads.map((thread) => {
            if (thread.id === threadId) {
              const newUpVotesBy = thread.upVotesBy.includes(userId) ?
                thread.upVotesBy.filter((id) => id !== userId) :
                [...thread.upVotesBy, userId];
              const newDownVotesBy = thread.downVotesBy.filter(
                  (id) => id !== userId,
              );

              return {
                ...thread,
                upVotesBy: newUpVotesBy,
                downVotesBy: newDownVotesBy,
                isUpVotedByCurrentUser: newUpVotesBy.includes(
                    userId,
                ),
                isDownVotedByCurrentUser: newDownVotesBy.includes(
                    userId,
                ),
              };
            }
            return thread;
          });

          if (state.detailThread && state.detailThread.id === threadId) {
            const newUpVotesBy = state.detailThread.upVotesBy.includes(userId) ?
              state.detailThread.upVotesBy.filter((id) => id !== userId) :
              [...state.detailThread.upVotesBy, userId];
            const newDownVotesBy = state.detailThread.downVotesBy.filter(
                (id) => id !== userId,
            );

            state.detailThread = {
              ...state.detailThread,
              upVotesBy: newUpVotesBy,
              downVotesBy: newDownVotesBy,
              isUpVotedByCurrentUser: newUpVotesBy.includes(
                  userId,
              ),
              isDownVotedByCurrentUser: newDownVotesBy.includes(
                  userId,
              ),
            };
          }
        })
        .addCase(upVoteThread.rejected, (state, action) => {
          state.upVoteStatus = 'failed';
          state.upVoteError = action.payload;
        })
        .addCase(downVoteThread.pending, (state) => {
          state.downVoteStatus = 'loading';
        })
        .addCase(downVoteThread.fulfilled, (state, action) => {
          state.downVoteStatus = 'succeeded';
          const {vote} = action.payload;
          const {userId, threadId} = vote;

          state.threads = state.threads.map((thread) => {
            if (thread.id === threadId) {
              const newDownVotesBy = thread.downVotesBy.includes(userId) ?
                thread.downVotesBy.filter((id) => id !== userId) :
                [...thread.downVotesBy, userId];
              const newUpVotesBy = thread.upVotesBy.filter(
                  (id) => id !== userId,
              );

              return {
                ...thread,
                upVotesBy: newUpVotesBy,
                downVotesBy: newDownVotesBy,
                isUpVotedByCurrentUser: newUpVotesBy.includes(
                    userId,
                ),
                isDownVotedByCurrentUser: newDownVotesBy.includes(
                    userId,
                ),
              };
            }
            return thread;
          });

          if (state.detailThread && state.detailThread.id === threadId) {
            const newDownVotesBy =
            state.detailThread.downVotesBy.includes(userId) ?
              state.detailThread.downVotesBy.filter((id) => id !== userId) :
              [...state.detailThread.downVotesBy, userId];
            const newUpVotesBy = state.detailThread.upVotesBy.filter(
                (id) => id !== userId,
            );

            state.detailThread = {
              ...state.detailThread,
              upVotesBy: newUpVotesBy,
              downVotesBy: newDownVotesBy,
              isUpVotedByCurrentUser: newUpVotesBy.includes(
                  userId,
              ),
              isDownVotedByCurrentUser: newDownVotesBy.includes(
                  userId,
              ),
            };
          }
        })
        .addCase(downVoteThread.rejected, (state, action) => {
          state.downVoteStatus = 'failed';
          state.downVoteError = action.payload;
        })
        .addCase(neutralVoteThread.pending, (state) => {
          state.neutralVoteStatus = 'loading';
        })
        .addCase(neutralVoteThread.fulfilled, (state, action) => {
          state.neutralVoteStatus = 'succeeded';
          const {vote} = action.payload;
          const {userId, threadId} = vote;

          state.threads = state.threads.map((thread) => {
            if (thread.id === threadId) {
              const newUpVotesBy = thread.upVotesBy.filter((id) => id !== userId);
              const newDownVotesBy = thread.downVotesBy.filter((id) => id !== userId);

              return {
                ...thread,
                upVotesBy: newUpVotesBy,
                downVotesBy: newDownVotesBy,
                isUpVotedByCurrentUser: newUpVotesBy.includes(
                    userId,
                ),
                isDownVotedByCurrentUser: newDownVotesBy.includes(
                    userId,
                ),
              };
            }
            return thread;
          });

          if (state.detailThread && state.detailThread.id === threadId) {
            const newUpVotesBy = state.detailThread.upVotesBy.filter((id) => id !== userId);
            const newDownVotesBy = state.detailThread.downVotesBy.filter((id) => id !== userId);

            state.detailThread = {
              ...state.detailThread,
              upVotesBy: newUpVotesBy,
              downVotesBy: newDownVotesBy,
              isUpVotedByCurrentUser: newUpVotesBy.includes(
                  userId,
              ),
              isDownVotedByCurrentUser: newDownVotesBy.includes(
                  userId,
              ),
            };
          }
        })
        .addCase(neutralVoteThread.rejected, (state, action) => {
          state.neutralVoteStatus = 'failed';
          state.neutralVoteError = action.payload;
        })
        .addCase(upVoteComment.fulfilled, (state, action) => {
          const {vote, commentId, threadId} = action.payload;
          const {userId} = vote;

          if (state.detailThread && state.detailThread.id === threadId) {
            state.detailThread = {
              ...state.detailThread,
              comments: state.detailThread.comments.map((comment) => {
                if (comment.id === commentId) {
                  const newUpVotesBy = comment.upVotesBy.includes(userId) ?
                    comment.upVotesBy.filter((id) => id !== userId) :
                    [...comment.upVotesBy, userId];
                  return {
                    ...comment,
                    upVotesBy: newUpVotesBy,
                  };
                }
                return comment;
              }),
            };
          }
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
export const selectUpVoteStatus = (state) => state.threads.upVoteStatus;
export const selectUpVoteError = (state) => state.threads.upVoteError;
export const selectDownVote = (state) =>
  state.threads
      .downVoteStatus;
export const selectDownVoteError = (state) => state.threads.downVoteError;
export const selectNeutralVoteStatus = (state) =>
  state.threads.neutralVoteStatus;
export const selectNeutralVoteError = (state) => state.threads.neutralVoteError;


export default threadSlice.reducer;
