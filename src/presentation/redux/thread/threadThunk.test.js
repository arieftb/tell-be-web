import {configureStore} from '@reduxjs/toolkit';
import {
  fetchThreads,
  fetchThreadDetail,
  submitThread,
  submitComment,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
} from './threadSlice';
import {UpVoteCommentUseCase} from '../../../application/thread/UpVoteCommentUseCase';
import {DownVoteCommentUseCase} from '../../../application/thread/DownVoteCommentUseCase';
import {NeutralVoteCommentUseCase} from '../../../application/thread/NeutralVoteCommentUseCase';
import AllThreadsUseCase from '../../../application/thread/GetAllThreadsUseCase';
import ThreadDetailUseCase from '../../../application/thread/GetThreadDetailUseCase';
import {SubmitThreadUseCase} from '../../../application/thread/SubmitThreadUseCase';
import CommentUseCase from '../../../application/thread/SubmitCommentUseCase';
import {UpVoteThreadUseCase} from '../../../application/thread/UpVoteThreadUseCase';
import {DownVoteUC} from '../../../application/thread/DownVoteUC';
import {NeutralVoteThreadUseCase} from '../../../application/thread/NeutralVoteThreadUseCase';
import {vi} from 'vitest';

// Mock the use cases
vi.mock('../../../application/thread/UpVoteCommentUseCase');
vi.mock('../../../application/thread/DownVoteCommentUseCase');
vi.mock('../../../application/thread/NeutralVoteCommentUseCase');
vi.mock('../../../application/thread/GetAllThreadsUseCase');

const mockThreadDetailUseCaseExecute = vi.fn();
vi.mock('../../../application/thread/GetThreadDetailUseCase', () => ({
  default: vi.fn(() => ({
    execute: mockThreadDetailUseCaseExecute,
  })),
}));

const mockSubmitThreadUseCaseExecute = vi.fn();
vi.mock('../../../application/thread/SubmitThreadUseCase', () => ({
  SubmitThreadUseCase: vi.fn(() => ({
    execute: mockSubmitThreadUseCaseExecute,
  })),
}));

const mockCommentUseCaseExecute = vi.fn();
vi.mock('../../../application/thread/SubmitCommentUseCase', () => ({
  default: vi.fn(() => ({
    execute: mockCommentUseCaseExecute,
  })),
}));

const mockUpVoteThreadUseCaseExecute = vi.fn();
vi.mock('../../../application/thread/UpVoteThreadUseCase', () => ({
  UpVoteThreadUseCase: vi.fn(() => ({
    execute: mockUpVoteThreadUseCaseExecute,
  })),
}));

const mockDownVoteUCExecute = vi.fn();
vi.mock('../../../application/thread/DownVoteUC', () => ({
  DownVoteUC: vi.fn(() => ({
    execute: mockDownVoteUCExecute,
  })),
}));

const mockNeutralVoteThreadUseCaseExecute = vi.fn();
vi.mock('../../../application/thread/NeutralVoteThreadUseCase', () => ({
  NeutralVoteThreadUseCase: vi.fn(() => ({
    execute: mockNeutralVoteThreadUseCaseExecute,
  })),
}));

describe('Thread Thunks', () => {
  let store;
  let initialState;
  let dispatchedActions; // To store dispatched actions

  // Define customMiddleware outside beforeEach to ensure it's consistent
  const customMiddleware = () => (next) => (action) => {
    dispatchedActions.push(action);
    return next(action);
  };

  beforeEach(() => {
    initialState = {
      threads: {
        threads: [
          {id: 'thread-1', upVotesBy: [], downVotesBy: [], isUpVotedByCurrentUser: false, isDownVotedByCurrentUser: false},
        ],
        detailThread: {
          id: 'thread-1',
          comments: [
            {id: 'comment-1', upVotesBy: [], downVotesBy: []},
            {id: 'comment-2', upVotesBy: [], downVotesBy: []},
          ],
        },
      },
      auth: {
        user: {id: 'user-1'},
      },
    };

    dispatchedActions = []; // Reset for each test

    store = configureStore({
      reducer: {
        threads: (state = initialState.threads) => {
          return state;
        },
        auth: (state = initialState.auth) => state,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(customMiddleware),
    });

    // Clear all mocks before each test
    UpVoteCommentUseCase.mockClear();
    DownVoteCommentUseCase.mockClear();
    NeutralVoteCommentUseCase.mockClear();
    AllThreadsUseCase.mockClear();
    mockThreadDetailUseCaseExecute.mockClear();
    ThreadDetailUseCase.mockClear();
    mockSubmitThreadUseCaseExecute.mockClear();
    SubmitThreadUseCase.mockClear();
    mockCommentUseCaseExecute.mockClear();
    CommentUseCase.mockClear();
    mockUpVoteThreadUseCaseExecute.mockClear();
    UpVoteThreadUseCase.mockClear();
    mockDownVoteUCExecute.mockClear();
    DownVoteUC.mockClear();
    mockNeutralVoteThreadUseCaseExecute.mockClear();
    NeutralVoteThreadUseCase.mockClear();
  });

  // Test for fetchThreads thunk
  describe('fetchThreads', () => {
    it('should dispatch fulfilled action when fetching threads is successful', async () => {
      const mockThreads = [
        {id: 'thread-1', title: 'Thread 1', category: 'react'},
        {id: 'thread-2', title: 'Thread 2', category: 'javascript'},
      ];
      AllThreadsUseCase.mockImplementationOnce(() => ({
        execute: vi.fn().mockResolvedValue(mockThreads),
      }));

      await store.dispatch(fetchThreads());

      expect(dispatchedActions[0].type).toBe(fetchThreads.pending.type);
      expect(dispatchedActions[1].type).toBe(fetchThreads.fulfilled.type);
      expect(dispatchedActions[1].payload).toEqual(mockThreads);
      expect(AllThreadsUseCase).toHaveBeenCalledTimes(1);
    });

    it('should dispatch rejected action when fetching threads fails', async () => {
      const errorMessage = 'Failed to fetch threads';
      AllThreadsUseCase.mockImplementationOnce(() => ({
        execute: vi.fn().mockRejectedValue(new Error(errorMessage)),
      }));

      await store.dispatch(fetchThreads());

      expect(dispatchedActions[0].type).toBe(fetchThreads.pending.type);
      expect(dispatchedActions[1].type).toBe(fetchThreads.rejected.type);
      expect(dispatchedActions[1].payload).toEqual(errorMessage);
      expect(AllThreadsUseCase).toHaveBeenCalledTimes(1);
    });
  });

  // Test for fetchThreadDetail thunk
  describe('fetchThreadDetail', () => {
    it('should dispatch fulfilled action when fetching thread detail is successful', async () => {
      const threadId = 'thread-1';
      const mockThreadDetail = {id: threadId, title: 'Detail Thread', body: 'Body'};
      mockThreadDetailUseCaseExecute.mockResolvedValue(mockThreadDetail);

      await store.dispatch(fetchThreadDetail(threadId));

      expect(dispatchedActions[0].type).toBe(fetchThreadDetail.pending.type);
      expect(dispatchedActions[1].type).toBe(fetchThreadDetail.fulfilled.type);
      expect(dispatchedActions[1].payload).toEqual(mockThreadDetail);
      expect(ThreadDetailUseCase).toHaveBeenCalledTimes(1);
      expect(mockThreadDetailUseCaseExecute).toHaveBeenCalledWith(threadId);
    });

    it('should dispatch rejected action when fetching thread detail fails', async () => {
      const threadId = 'thread-1';
      const errorMessage = 'Failed to fetch thread detail';
      mockThreadDetailUseCaseExecute.mockRejectedValue(new Error(errorMessage));

      await store.dispatch(fetchThreadDetail(threadId));

      expect(dispatchedActions[0].type).toBe(fetchThreadDetail.pending.type);
      expect(dispatchedActions[1].type).toBe(fetchThreadDetail.rejected.type);
      expect(dispatchedActions[1].payload).toEqual(errorMessage);
      expect(ThreadDetailUseCase).toHaveBeenCalledTimes(1);
      expect(mockThreadDetailUseCaseExecute).toHaveBeenCalledWith(threadId);
    });
  });

  // Test for submitThread thunk
  describe('submitThread', () => {
    it('should dispatch fulfilled action when submitting a thread is successful', async () => {
      const threadData = {title: 'New Thread', body: 'Content', category: 'test'};
      mockSubmitThreadUseCaseExecute.mockResolvedValue(undefined); // submitThreadUseCase.execute returns void

      await store.dispatch(submitThread(threadData));

      expect(dispatchedActions[0].type).toBe(submitThread.pending.type);
      expect(dispatchedActions[1].type).toBe(submitThread.fulfilled.type);
      expect(dispatchedActions[1].payload).toBeUndefined();
      expect(SubmitThreadUseCase).toHaveBeenCalledTimes(1);
      expect(mockSubmitThreadUseCaseExecute).toHaveBeenCalledWith(threadData);
    });

    it('should dispatch rejected action when submitting a thread fails', async () => {
      const threadData = {title: 'New Thread', body: 'Content', category: 'test'};
      const errorMessage = 'Failed to submit thread';
      mockSubmitThreadUseCaseExecute.mockRejectedValue(new Error(errorMessage));

      await store.dispatch(submitThread(threadData));

      expect(dispatchedActions[0].type).toBe(submitThread.pending.type);
      expect(dispatchedActions[1].type).toBe(submitThread.rejected.type);
      expect(dispatchedActions[1].payload).toEqual(errorMessage);
      expect(SubmitThreadUseCase).toHaveBeenCalledTimes(1);
      expect(mockSubmitThreadUseCaseExecute).toHaveBeenCalledWith(threadData);
    });
  });

  // Test for submitComment thunk
  describe('submitComment', () => {
    it('should dispatch fulfilled action when submitting a comment is successful', async () => {
      const commentData = {threadId: 'thread-1', content: 'New Comment'};
      const mockComment = {id: 'comment-3', content: 'New Comment', owner: {id: 'user-1'}};
      mockCommentUseCaseExecute.mockResolvedValue(mockComment);

      await store.dispatch(submitComment(commentData));

      expect(dispatchedActions[0].type).toBe(submitComment.pending.type);
      expect(dispatchedActions[1].type).toBe(submitComment.fulfilled.type);
      expect(dispatchedActions[1].payload).toEqual(mockComment);
      expect(CommentUseCase).toHaveBeenCalledTimes(1);
      expect(mockCommentUseCaseExecute).toHaveBeenCalledWith(commentData);
    });

    it('should dispatch rejected action when submitting a comment fails', async () => {
      const commentData = {threadId: 'thread-1', content: 'New Comment'};
      const errorMessage = 'Failed to submit comment';
      mockCommentUseCaseExecute.mockRejectedValue(new Error(errorMessage));

      await store.dispatch(submitComment(commentData));

      expect(dispatchedActions[0].type).toBe(submitComment.pending.type);
      expect(dispatchedActions[1].type).toBe(submitComment.rejected.type);
      expect(dispatchedActions[1].payload).toEqual(errorMessage);
      expect(CommentUseCase).toHaveBeenCalledTimes(1);
      expect(mockCommentUseCaseExecute).toHaveBeenCalledWith(commentData);
    });
  });

  // Test for upVoteThread thunk
  describe('upVoteThread', () => {
    it('should dispatch fulfilled action when upvoting a thread is successful', async () => {
      const threadId = 'thread-1';
      const currentUserId = 'user-1';
      const mockVote = {id: 'vote-1', userId: currentUserId, threadId, voteType: 1};
      mockUpVoteThreadUseCaseExecute.mockResolvedValue(mockVote);

      await store.dispatch(upVoteThread(threadId));

      expect(dispatchedActions[0].type).toBe(upVoteThread.pending.type);
      expect(dispatchedActions[1].type).toBe(upVoteThread.fulfilled.type);
      expect(dispatchedActions[1].payload).toEqual({
        vote: mockVote,
        threadId,
        currentUserId,
      });
      expect(UpVoteThreadUseCase).toHaveBeenCalledTimes(1);
      expect(mockUpVoteThreadUseCaseExecute).toHaveBeenCalledWith(threadId);
    });

    it('should dispatch fulfilled action when upvoting an already upvoted thread (neutralize)', async () => {
      const threadId = 'thread-1';
      const currentUserId = 'user-1';
      const mockNeutralVote = {id: 'vote-neutral', userId: currentUserId, threadId, voteType: 0};

      // Create a new store instance for this specific test case
      const testStore = configureStore({
        reducer: {
          threads: (state = {
            ...initialState.threads,
            threads: [
              {...initialState.threads.threads[0], upVotesBy: [currentUserId], isUpVotedByCurrentUser: true},
            ],
          }) => state,
          auth: (state = initialState.auth) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat(customMiddleware),
      });

      mockUpVoteThreadUseCaseExecute.mockResolvedValue(mockNeutralVote);
      mockNeutralVoteThreadUseCaseExecute.mockResolvedValue(mockNeutralVote);

      await testStore.dispatch(upVoteThread(threadId));

      // The dispatchedActions array is shared, so we need to check the last two actions
      const actions = dispatchedActions.slice(-2);
      expect(actions[0].type).toBe(upVoteThread.pending.type);
      expect(actions[1].type).toBe(upVoteThread.fulfilled.type);
      expect(actions[1].payload).toEqual({
        vote: mockNeutralVote,
        threadId,
        currentUserId,
      });
      // Expect NeutralVoteThreadUseCase to be called, not UpVoteThreadUseCase
      expect(NeutralVoteThreadUseCase).toHaveBeenCalledTimes(1);
      expect(mockNeutralVoteThreadUseCaseExecute).toHaveBeenCalledWith(threadId);
    });

    it('should dispatch rejected action when upvoting a thread fails', async () => {
      const threadId = 'thread-1';
      const errorMessage = 'Failed to up-vote thread';
      mockUpVoteThreadUseCaseExecute.mockRejectedValue(new Error(errorMessage));

      await store.dispatch(upVoteThread(threadId));

      expect(dispatchedActions[0].type).toBe(upVoteThread.pending.type);
      expect(dispatchedActions[1].type).toBe(upVoteThread.rejected.type);
      expect(dispatchedActions[1].payload).toEqual(errorMessage);
      expect(UpVoteThreadUseCase).toHaveBeenCalledTimes(1);
      expect(mockUpVoteThreadUseCaseExecute).toHaveBeenCalledWith(threadId);
    });
  });

  // Test for downVoteThread thunk
  describe('downVoteThread', () => {
    it('should dispatch fulfilled action when downvoting a thread is successful', async () => {
      const threadId = 'thread-1';
      const currentUserId = 'user-1';
      const mockVote = {id: 'vote-2', userId: currentUserId, threadId, voteType: -1};
      mockDownVoteUCExecute.mockResolvedValue(mockVote);

      await store.dispatch(downVoteThread(threadId));

      expect(dispatchedActions[0].type).toBe(downVoteThread.pending.type);
      expect(dispatchedActions[1].type).toBe(downVoteThread.fulfilled.type);
      expect(dispatchedActions[1].payload).toEqual({
        vote: mockVote,
        threadId,
        currentUserId,
      });
      expect(DownVoteUC).toHaveBeenCalledTimes(1);
      expect(mockDownVoteUCExecute).toHaveBeenCalledWith(threadId);
    });

    it('should dispatch fulfilled action when downvoting an already downvoted thread (neutralize)', async () => {
      const threadId = 'thread-1';
      const currentUserId = 'user-1';
      const mockNeutralVote = {id: 'vote-neutral', userId: currentUserId, threadId, voteType: 0};

      // Create a new store instance for this specific test case
      const testStore = configureStore({
        reducer: {
          threads: (state = {
            ...initialState.threads,
            threads: [
              {...initialState.threads.threads[0], downVotesBy: [currentUserId], isDownVotedByCurrentUser: true},
            ],
          }) => state,
          auth: (state = initialState.auth) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat(customMiddleware),
      });

      mockDownVoteUCExecute.mockResolvedValue(mockNeutralVote);
      mockNeutralVoteThreadUseCaseExecute.mockResolvedValue(mockNeutralVote);

      await testStore.dispatch(downVoteThread(threadId));

      // The dispatchedActions array is shared, so we need to check the last two actions
      const actions = dispatchedActions.slice(-2);
      expect(actions[0].type).toBe(downVoteThread.pending.type);
      expect(actions[1].type).toBe(downVoteThread.fulfilled.type);
      expect(actions[1].payload).toEqual({
        vote: mockNeutralVote,
        threadId,
        currentUserId,
      });
      // Expect NeutralVoteThreadUseCase to be called, not DownVoteUC
      expect(NeutralVoteThreadUseCase).toHaveBeenCalledTimes(1);
      expect(mockNeutralVoteThreadUseCaseExecute).toHaveBeenCalledWith(threadId);
    });

    it('should dispatch rejected action when downvoting a thread fails', async () => {
      const threadId = 'thread-1';
      const errorMessage = 'Failed to down-vote thread';
      mockDownVoteUCExecute.mockRejectedValue(new Error(errorMessage));

      await store.dispatch(downVoteThread(threadId));

      expect(dispatchedActions[0].type).toBe(downVoteThread.pending.type);
      expect(dispatchedActions[1].type).toBe(downVoteThread.rejected.type);
      expect(dispatchedActions[1].payload).toEqual(errorMessage);
      expect(DownVoteUC).toHaveBeenCalledTimes(1);
      expect(mockDownVoteUCExecute).toHaveBeenCalledWith(threadId);
    });
  });

  // Test for neutralVoteThread thunk
  describe('neutralVoteThread', () => {
    it('should dispatch fulfilled action when neutralizing a thread vote is successful', async () => {
      const threadId = 'thread-1';
      const currentUserId = 'user-1';
      const mockNeutralVote = {id: 'vote-neutral', userId: currentUserId, threadId, voteType: 0};

      // Create a new store instance for this specific test case
      const testStore = configureStore({
        reducer: {
          threads: (state = {
            ...initialState.threads,
            threads: [
              {...initialState.threads.threads[0], upVotesBy: [currentUserId], isUpVotedByCurrentUser: true},
            ],
          }) => state,
          auth: (state = initialState.auth) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat(customMiddleware),
      });

      mockNeutralVoteThreadUseCaseExecute.mockResolvedValue(mockNeutralVote);

      await testStore.dispatch(neutralVoteThread(threadId));

      // The dispatchedActions array is shared, so we need to check the last two actions
      const actions = dispatchedActions.slice(-2);
      expect(actions[0].type).toBe(neutralVoteThread.pending.type);
      expect(actions[1].type).toBe(neutralVoteThread.fulfilled.type);
      expect(actions[1].payload).toEqual({
        vote: mockNeutralVote,
        threadId,
        currentUserId,
      });
      expect(NeutralVoteThreadUseCase).toHaveBeenCalledTimes(1);
      expect(mockNeutralVoteThreadUseCaseExecute).toHaveBeenCalledWith(threadId);
    });

    it('should dispatch rejected action when neutralizing a thread vote fails', async () => {
      const threadId = 'thread-1';
      const errorMessage = 'Failed to neutralize thread vote';
      mockNeutralVoteThreadUseCaseExecute.mockRejectedValue(new Error(errorMessage));

      await store.dispatch(neutralVoteThread(threadId));

      expect(dispatchedActions[0].type).toBe(neutralVoteThread.pending.type);
      expect(dispatchedActions[1].type).toBe(neutralVoteThread.rejected.type);
      expect(dispatchedActions[1].payload).toEqual({errorMessage, originalThreadState: expect.any(Object)});
      expect(NeutralVoteThreadUseCase).toHaveBeenCalledTimes(1);
      expect(mockNeutralVoteThreadUseCaseExecute).toHaveBeenCalledWith(threadId);
    });
  });
});
