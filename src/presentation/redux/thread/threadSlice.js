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
import {DownVoteCommentUseCase} from
  '../../../application/thread/DownVoteCommentUseCase.js';
import {NeutralVoteCommentUseCase} from
  '../../../application/thread/NeutralVoteCommentUseCase.js';

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
          const currentUserId = getState().auth.user ? getState().auth.user.id : null;
          return {vote, threadId, currentUserId};
        }
        const vote = await upVoteThreadUseCase.execute(threadId);
        const currentUserId = getState().auth.user ? getState().auth.user.id : null;
        return {vote, threadId, currentUserId};
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
          const currentUserId = getState().auth.user ? getState().auth.user.id : null;
          return {vote, threadId, currentUserId};
        }
        const vote = await downVoteThreadUseCase.execute(threadId);
        const currentUserId = getState().auth.user ? getState().auth.user.id : null;
        return {vote, threadId, currentUserId};
      } catch (error) {
        const errorMessage = error.message || 'Failed to down-vote thread';
        return rejectWithValue(errorMessage);
      }
    },
);

export const neutralVoteThread = createAsyncThunk(
    'threads/neutralVoteThread',
    async (threadId, {rejectWithValue, getState}) => {
      const {threads, detailThread} = getState().threads;
      const thread = threads.find((t) => t.id === threadId) ||
        (detailThread && detailThread.id === threadId ? detailThread : null);
      const originalThreadState = JSON.parse(JSON.stringify(thread)); // Deep copy

      try {
        const neutralVoteThreadUseCase = new NeutralVoteThreadUseCase();
        const vote = await neutralVoteThreadUseCase.execute(threadId);
        const currentUserId = getState().auth.user ? getState().auth.user.id : null;
        return {vote, threadId, currentUserId};
      } catch (error) {
        const errorMessage = error.message || 'Failed to neutral-vote thread';
        return rejectWithValue({errorMessage, originalThreadState});
      }
    },
);

export const upVoteComment = createAsyncThunk(
    'threads/upVoteComment',
    async ({threadId, commentId}, {rejectWithValue, getState}) => {
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
        const currentUserId = getState().auth.user ? getState().auth.user.id : null;
        return {vote: serializableVote, commentId, threadId, currentUserId};
      } catch (error) {
        const errorMessage = error.message || 'Failed to up-vote comment';
        return rejectWithValue(errorMessage);
      }
    },
);

export const downVoteComment = createAsyncThunk(
    'threads/downVoteComment',
    async ({threadId, commentId}, {rejectWithValue, getState}) => {
      try {
        const downVoteCommentUseCase = new DownVoteCommentUseCase();
        const result = await downVoteCommentUseCase.execute(threadId, commentId);
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
        const currentUserId = getState().auth.user ? getState().auth.user.id : null;
        return {vote: serializableVote, commentId, threadId, currentUserId};
      } catch (error) {
        const errorMessage = error.message || 'Failed to down-vote comment';
        return rejectWithValue(errorMessage);
      }
    },
);

export const neutralVoteComment = createAsyncThunk(
    'threads/neutralVoteComment',
    async ({threadId, commentId}, {rejectWithValue, getState}) => {
      try {
        const neutralVoteCommentUseCase = new NeutralVoteCommentUseCase();
        const result = await neutralVoteCommentUseCase.execute(threadId, commentId);
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
        const currentUserId = getState().auth.user ? getState().auth.user.id : null;
        return {vote: serializableVote, commentId, threadId, currentUserId};
      } catch (error) {
        const errorMessage = error.message || 'Failed to neutral-vote comment';
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
        .addCase(upVoteThread.pending, (state, action) => {
          const {threadId} = action.meta.arg;
          const currentUserId = action.meta.arg.currentUserId;

          state.threads = state.threads.map((thread) => {
            if (thread.id === threadId) {
              const newUpVotesBy = thread.upVotesBy.includes(currentUserId) ?
                thread.upVotesBy.filter((id) => id !== currentUserId) :
                [...thread.upVotesBy, currentUserId];
              const newDownVotesBy = thread.downVotesBy.filter((id) => id !== currentUserId);

              return {
                ...thread,
                upVotesBy: newUpVotesBy,
                downVotesBy: newDownVotesBy,
                isUpVotedByCurrentUser: true,
                isDownVotedByCurrentUser: false,
              };
            }
            return thread;
          });

          if (state.detailThread && state.detailThread.id === threadId) {
            const newUpVotesBy = state.detailThread.upVotesBy.includes(currentUserId) ?
              state.detailThread.upVotesBy.filter((id) => id !== currentUserId) :
              [...state.detailThread.upVotesBy, currentUserId];
            const newDownVotesBy = state.detailThread.downVotesBy.filter((id) => id !== currentUserId);

            state.detailThread = {
              ...state.detailThread,
              upVotesBy: newUpVotesBy,
              downVotesBy: newDownVotesBy,
              isUpVotedByCurrentUser: true,
              isDownVotedByCurrentUser: false,
            };
          }
        })
        .addCase(upVoteThread.rejected, (state, action) => {
          const {threadId} = action.meta.arg;
          const currentUserId = action.meta.arg.currentUserId;

          state.threads = state.threads.map((thread) => {
            if (thread.id === threadId) {
              const newUpVotesBy = thread.upVotesBy.filter((id) => id !== currentUserId);
              const newDownVotesBy = thread.downVotesBy.filter((id) => id !== currentUserId);

              return {
                ...thread,
                upVotesBy: newUpVotesBy,
                downVotesBy: newDownVotesBy,
                isUpVotedByCurrentUser: false,
                isDownVotedByCurrentUser: false,
              };
            }
            return thread;
          });

          if (state.detailThread && state.detailThread.id === threadId) {
            const newUpVotesBy = state.detailThread.upVotesBy.filter((id) => id !== currentUserId);
            const newDownVotesBy = state.detailThread.downVotesBy.filter((id) => id !== currentUserId);

            state.detailThread = {
              ...state.detailThread,
              upVotesBy: newUpVotesBy,
              downVotesBy: newDownVotesBy,
              isUpVotedByCurrentUser: false,
              isDownVotedByCurrentUser: false,
            };
          }
        })
        .addCase(upVoteThread.fulfilled, (state, action) => {
          const {vote, threadId} = action.payload;
          const {userId} = vote;

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
        .addCase(downVoteThread.pending, (state, action) => {
          const {threadId} = action.meta.arg;
          const currentUserId = action.meta.arg.currentUserId;

          state.threads = state.threads.map((thread) => {
            if (thread.id === threadId) {
              const newDownVotesBy = thread.downVotesBy.includes(currentUserId) ?
                thread.downVotesBy.filter((id) => id !== currentUserId) :
                [...thread.downVotesBy, currentUserId];
              const newUpVotesBy = thread.upVotesBy.filter((id) => id !== currentUserId);

              return {
                ...thread,
                upVotesBy: newUpVotesBy,
                downVotesBy: newDownVotesBy,
                isUpVotedByCurrentUser: false,
                isDownVotedByCurrentUser: true,
              };
            }
            return thread;
          });

          if (state.detailThread && state.detailThread.id === threadId) {
            const newDownVotesBy = state.detailThread.downVotesBy.includes(currentUserId) ?
              state.detailThread.downVotesBy.filter((id) => id !== currentUserId) :
              [...state.detailThread.downVotesBy, currentUserId];
            const newUpVotesBy = state.detailThread.upVotesBy.filter((id) => id !== currentUserId);

            state.detailThread = {
              ...state.detailThread,
              upVotesBy: newUpVotesBy,
              downVotesBy: newDownVotesBy,
              isUpVotedByCurrentUser: false,
              isDownVotedByCurrentUser: true,
            };
          }
        })
        .addCase(downVoteThread.rejected, (state, action) => {
          const {threadId} = action.meta.arg;
          const currentUserId = action.meta.arg.currentUserId;

          state.threads = state.threads.map((thread) => {
            if (thread.id === threadId) {
              const newDownVotesBy = thread.downVotesBy.filter((id) => id !== currentUserId);
              const newUpVotesBy = thread.upVotesBy.filter((id) => id !== currentUserId);

              return {
                ...thread,
                upVotesBy: newUpVotesBy,
                downVotesBy: newDownVotesBy,
                isUpVotedByCurrentUser: false,
                isDownVotedByCurrentUser: false,
              };
            }
            return thread;
          });

          if (state.detailThread && state.detailThread.id === threadId) {
            const newDownVotesBy = state.detailThread.downVotesBy.filter((id) => id !== currentUserId);
            const newUpVotesBy = state.detailThread.upVotesBy.filter((id) => id !== currentUserId);

            state.detailThread = {
              ...state.detailThread,
              upVotesBy: newUpVotesBy,
              downVotesBy: newDownVotesBy,
              isUpVotedByCurrentUser: false,
              isDownVotedByCurrentUser: false,
            };
          }
        })
        .addCase(downVoteThread.fulfilled, (state, action) => {
          const {vote, threadId} = action.payload;
          const {userId} = vote;

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
        .addCase(neutralVoteThread.pending, (state, action) => {
          const {threadId} = action.meta.arg;
          const currentUserId = action.meta.arg.currentUserId;

          state.threads = state.threads.map((thread) => {
            if (thread.id === threadId) {
              const newUpVotesBy = thread.upVotesBy.filter((id) => id !== currentUserId);
              const newDownVotesBy = thread.downVotesBy.filter((id) => id !== currentUserId);

              return {
                ...thread,
                upVotesBy: newUpVotesBy,
                downVotesBy: newDownVotesBy,
                isUpVotedByCurrentUser: false,
                isDownVotedByCurrentUser: false,
              };
            }
            return thread;
          });

          if (state.detailThread && state.detailThread.id === threadId) {
            const newUpVotesBy = state.detailThread.upVotesBy.filter((id) => id !== currentUserId);
            const newDownVotesBy = state.detailThread.downVotesBy.filter((id) => id !== currentUserId);

            state.detailThread = {
              ...state.detailThread,
              upVotesBy: newUpVotesBy,
              downVotesBy: newDownVotesBy,
              isUpVotedByCurrentUser: false,
              isDownVotedByCurrentUser: false,
            };
          }
        })
        .addCase(neutralVoteThread.rejected, (state, action) => {
          const {threadId} = action.meta.arg;
          const {originalThreadState} = action.payload;

          state.threads = state.threads.map((thread) => {
            if (thread.id === threadId) {
              return originalThreadState;
            }
            return thread;
          });

          if (state.detailThread && state.detailThread.id === threadId) {
            state.detailThread = originalThreadState;
          }
        })
        .addCase(neutralVoteThread.fulfilled, (state, action) => {
          const {vote, threadId} = action.payload;
          const {userId} = vote;

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
        .addCase(upVoteComment.pending, (state, action) => {
          const {threadId, commentId, currentUserId} = action.meta.arg;
          if (state.detailThread && state.detailThread.id === threadId) {
            state.detailThread = {
              ...state.detailThread,
              comments: state.detailThread.comments.map((comment) => {
                if (comment.id === commentId) {
                  const newUpVotesBy = comment.upVotesBy.includes(currentUserId) ?
                    comment.upVotesBy.filter((id) => id !== currentUserId) :
                    [...comment.upVotesBy, currentUserId];
                  const newDownVotesBy = comment.downVotesBy.filter((id) => id !== currentUserId);
                  return {
                    ...comment,
                    upVotesBy: newUpVotesBy,
                    downVotesBy: newDownVotesBy,
                    isUpVotedByCurrentUser: true,
                    isDownVotedByCurrentUser: false,
                  };
                }
                return comment;
              }),
            };
          }
        })
        .addCase(upVoteComment.rejected, (state, action) => {
          const {threadId, commentId, currentUserId} = action.meta.arg;
          if (state.detailThread && state.detailThread.id === threadId) {
            state.detailThread = {
              ...state.detailThread,
              comments: state.detailThread.comments.map((comment) => {
                if (comment.id === commentId) {
                  const newUpVotesBy = comment.upVotesBy.filter((id) => id !== currentUserId);
                  const newDownVotesBy = comment.downVotesBy.filter((id) => id !== currentUserId);
                  return {
                    ...comment,
                    upVotesBy: newUpVotesBy,
                    downVotesBy: newDownVotesBy,
                    isUpVotedByCurrentUser: false,
                    isDownVotedByCurrentUser: false,
                  };
                }
                return comment;
              }),
            };
          }
        })
        .addCase(upVoteComment.fulfilled, () => {
          // The optimistic update in pending case already handled the state change.
          // This fulfilled case can be used for any final consistency checks if needed.
          // No explicit state modification needed here unless backend response dictates a different state.
        })
        .addCase(downVoteComment.pending, (state, action) => {
          const {threadId, commentId, currentUserId} = action.meta.arg;
          if (state.detailThread && state.detailThread.id === threadId) {
            state.detailThread = {
              ...state.detailThread,
              comments: state.detailThread.comments.map((comment) => {
                if (comment.id === commentId) {
                  const newDownVotesBy = comment.downVotesBy.includes(currentUserId) ?
                    comment.downVotesBy.filter((id) => id !== currentUserId) :
                    [...comment.downVotesBy, currentUserId];
                  const newUpVotesBy = comment.upVotesBy.filter((id) => id !== currentUserId);
                  return {
                    ...comment,
                    upVotesBy: newUpVotesBy,
                    downVotesBy: newDownVotesBy,
                    isUpVotedByCurrentUser: false,
                    isDownVotedByCurrentUser: true,
                  };
                }
                return comment;
              }),
            };
          }
        })
        .addCase(downVoteComment.rejected, (state, action) => {
          const {threadId, commentId, currentUserId} = action.meta.arg;
          if (state.detailThread && state.detailThread.id === threadId) {
            state.detailThread = {
              ...state.detailThread,
              comments: state.detailThread.comments.map((comment) => {
                if (comment.id === commentId) {
                  const newDownVotesBy = comment.downVotesBy.filter((id) => id !== currentUserId);
                  const newUpVotesBy = comment.upVotesBy.filter((id) => id !== currentUserId);
                  return {
                    ...comment,
                    upVotesBy: newUpVotesBy,
                    downVotesBy: newDownVotesBy,
                    isUpVotedByCurrentUser: false,
                    isDownVotedByCurrentUser: false,
                  };
                }
                return comment;
              }),
            };
          }
        })
        .addCase(downVoteComment.fulfilled, () => {
          // The optimistic update in pending case already handled the state change.
          // This fulfilled case can be used for any final consistency checks if needed.
          // No explicit state modification needed here unless backend response dictates a different state.
        })
        .addCase(neutralVoteComment.pending, (state, action) => {
          const {threadId, commentId, currentUserId} = action.meta.arg;
          if (state.detailThread && state.detailThread.id === threadId) {
            state.detailThread = {
              ...state.detailThread,
              comments: state.detailThread.comments.map((comment) => {
                if (comment.id === commentId) {
                  const newUpVotesBy = comment.upVotesBy.filter((id) => id !== currentUserId);
                  const newDownVotesBy = comment.downVotesBy.filter((id) => id !== currentUserId);
                  return {
                    ...comment,
                    upVotesBy: newUpVotesBy,
                    downVotesBy: newDownVotesBy,
                    isUpVotedByCurrentUser: false,
                    isDownVotedByCurrentUser: false,
                  };
                }
                return comment;
              }),
            };
          }
        })
        .addCase(neutralVoteComment.rejected, (state, action) => {
          const {threadId, commentId, currentUserId} = action.meta.arg;
          if (state.detailThread && state.detailThread.id === threadId) {
            state.detailThread = {
              ...state.detailThread,
              comments: state.detailThread.comments.map((comment) => {
                if (comment.id === commentId) {
                  // Revert to previous state based on currentUserId
                  // This is a simplified revert, assuming the user was either upvoted or downvoted before
                  const originalUpVoted = comment.upVotesBy.includes(currentUserId);
                  const originalDownVoted = comment.downVotesBy.includes(currentUserId);

                  let newUpVotesBy = comment.upVotesBy.filter((id) => id !== currentUserId);
                  let newDownVotesBy = comment.downVotesBy.filter((id) => id !== currentUserId);

                  if (originalUpVoted) {
                    newUpVotesBy = [...newUpVotesBy, currentUserId];
                  } else if (originalDownVoted) {
                    newDownVotesBy = [...newDownVotesBy, currentUserId];
                  }

                  return {
                    ...comment,
                    upVotesBy: newUpVotesBy,
                    downVotesBy: newDownVotesBy,
                    isUpVotedByCurrentUser: originalUpVoted,
                    isDownVotedByCurrentUser: originalDownVoted,
                  };
                }
                return comment;
              }),
            };
          }
        })
        .addCase(neutralVoteComment.fulfilled, (state, action) => {
          const {vote, commentId, threadId} = action.payload;
          const {userId} = vote;

          if (state.detailThread && state.detailThread.id === threadId) {
            state.detailThread = {
              ...state.detailThread,
              comments: state.detailThread.comments.map((comment) => {
                if (comment.id === commentId) {
                  const newUpVotesBy = comment.upVotesBy.filter((id) => id !== userId);
                  const newDownVotesBy = comment.downVotesBy.filter((id) => id !== userId);
                  return {
                    ...comment,
                    upVotesBy: newUpVotesBy,
                    downVotesBy: newDownVotesBy,
                    isUpVotedByCurrentUser: false,
                    isDownVotedByCurrentUser: false,
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
