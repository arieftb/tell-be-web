import {configureStore} from '@reduxjs/toolkit';
import {
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
  fetchThreads,
  fetchThreadDetail,
  submitThread,
  submitComment,
} from './threadSlice';
import {UpVoteCommentUseCase} from '../../../application/thread/UpVoteCommentUseCase';
import {DownVoteCommentUseCase} from '../../../application/thread/DownVoteCommentUseCase';
import {NeutralVoteCommentUseCase} from '../../../application/thread/NeutralVoteCommentUseCase';
import AllThreadsUseCase from '../../../application/thread/GetAllThreadsUseCase';
import ThreadDetailUseCase from '../../../application/thread/GetThreadDetailUseCase';
import {SubmitThreadUseCase} from '../../../application/thread/SubmitThreadUseCase';
import CommentUseCase from '../../../application/thread/SubmitCommentUseCase';
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

describe('Thread Thunks', () => {
  let store;
  let initialState;
  let dispatchedActions; // To store dispatched actions

  beforeEach(() => {
    initialState = {
      threads: {
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

    const customMiddleware = () => (next) => (action) => {
      dispatchedActions.push(action);
      return next(action);
    };

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
    mockThreadDetailUseCaseExecute.mockClear(); // Clear the execute mock
    ThreadDetailUseCase.mockClear(); // Clear the constructor mock
    mockSubmitThreadUseCaseExecute.mockClear();
    SubmitThreadUseCase.mockClear();
    mockCommentUseCaseExecute.mockClear();
    CommentUseCase.mockClear();
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

  // Test for upVoteComment thunk
  describe('upVoteComment', () => {
    it('should dispatch fulfilled action when upvoting a comment is successful', async () => {
      const mockUpVoteCommentUseCaseInstance = {
        execute: vi.fn().mockResolvedValue({
          id: 'vote-1',
          userId: 'user-1',
          threadId: 'thread-1',
          voteType: 1,
        }),
      };
      UpVoteCommentUseCase.mockImplementationOnce(
          () => mockUpVoteCommentUseCaseInstance,
      );

      const threadId = 'thread-1';
      const commentId = 'comment-1';

      await store.dispatch(upVoteComment({threadId, commentId}));

      expect(dispatchedActions[0].type).toBe(upVoteComment.pending.type);
      expect(dispatchedActions[1].type).toBe(upVoteComment.fulfilled.type);
      expect(dispatchedActions[1].payload).toEqual({
        vote: {
          id: 'vote-1',
          userId: 'user-1',
          threadId: 'thread-1',
          voteType: 1,
        },
        commentId,
        threadId,
        currentUserId: 'user-1',
      });
      expect(mockUpVoteCommentUseCaseInstance.execute).toHaveBeenCalledWith(
          threadId, commentId,
      );
    });

    it('should dispatch rejected action when upvoting a comment fails', async () => {
      const errorMessage = 'Failed to upvote comment';
      const mockUpVoteCommentUseCaseInstance = {
        execute: vi.fn().mockRejectedValue(new Error(errorMessage)),
      };
      UpVoteCommentUseCase.mockImplementationOnce(
          () => mockUpVoteCommentUseCaseInstance,
      );

      const threadId = 'thread-1';
      const commentId = 'comment-1';

      await store.dispatch(upVoteComment({threadId, commentId}));

      expect(dispatchedActions[0].type).toBe(upVoteComment.pending.type);
      expect(dispatchedActions[1].type).toBe(upVoteComment.rejected.type);
      expect(dispatchedActions[1].payload).toEqual({
        errorMessage,
        originalCommentState: initialState.threads.detailThread.comments[0],
      });
      expect(mockUpVoteCommentUseCaseInstance.execute).toHaveBeenCalledWith(
          threadId, commentId,
      );
    });

    it('should dispatch rejected action when user not logged in', async () => {
      const mockUpVoteCommentUseCaseInstance = {
        execute: vi.fn().mockResolvedValue(false), // Simulate not logged in
      };
      UpVoteCommentUseCase.mockImplementationOnce(
          () => mockUpVoteCommentUseCaseInstance,
      );

      const threadId = 'thread-1';
      const commentId = 'comment-1';

      await store.dispatch(upVoteComment({threadId, commentId}));

      expect(dispatchedActions[0].type).toBe(upVoteComment.pending.type);
      expect(dispatchedActions[1].type).toBe(upVoteComment.rejected.type);
      expect(dispatchedActions[1].payload).toBe('User not logged in');
      expect(mockUpVoteCommentUseCaseInstance.execute).toHaveBeenCalledWith(
          threadId, commentId,
      );
    });
  });

  // Test for downVoteComment thunk
  describe('downVoteComment', () => {
    it('should dispatch fulfilled action when downvoting a comment is successful', async () => {
      const mockDownVoteCommentUseCaseInstance = {
        execute: vi.fn().mockResolvedValue({
          id: 'vote-2',
          userId: 'user-1',
          threadId: 'thread-1',
          voteType: -1,
        }),
      };
      DownVoteCommentUseCase.mockImplementationOnce(
          () => mockDownVoteCommentUseCaseInstance,
      );

      const threadId = 'thread-1';
      const commentId = 'comment-1';

      await store.dispatch(downVoteComment({threadId, commentId}));

      expect(dispatchedActions[0].type).toBe(downVoteComment.pending.type);
      expect(dispatchedActions[1].type).toBe(downVoteComment.fulfilled.type);
      expect(dispatchedActions[1].payload).toEqual({
        vote: {
          id: 'vote-2',
          userId: 'user-1',
          threadId: 'thread-1',
          voteType: -1,
        },
        commentId,
        threadId,
        currentUserId: 'user-1',
      });
      expect(mockDownVoteCommentUseCaseInstance.execute).toHaveBeenCalledWith(
          threadId, commentId,
      );
    });

    it('should dispatch rejected action when downvoting a comment fails', async () => {
      const errorMessage = 'Failed to downvote comment';
      const mockDownVoteCommentUseCaseInstance = {
        execute: vi.fn().mockRejectedValue(new Error(errorMessage)),
      };
      DownVoteCommentUseCase.mockImplementationOnce(
          () => mockDownVoteCommentUseCaseInstance,
      );

      const threadId = 'thread-1';
      const commentId = 'comment-1';

      await store.dispatch(downVoteComment({threadId, commentId}));

      expect(dispatchedActions[0].type).toBe(downVoteComment.pending.type);
      expect(dispatchedActions[1].type).toBe(downVoteComment.rejected.type);
      expect(dispatchedActions[1].payload).toEqual({
        errorMessage,
        originalCommentState: initialState.threads.detailThread.comments[0],
      });
      expect(mockDownVoteCommentUseCaseInstance.execute).toHaveBeenCalledWith(
          threadId, commentId,
      );
    });

    it('should dispatch rejected action when user not logged in', async () => {
      const mockDownVoteCommentUseCaseInstance = {
        execute: vi.fn().mockResolvedValue(false), // Simulate not logged in
      };
      DownVoteCommentUseCase.mockImplementationOnce(
          () => mockDownVoteCommentUseCaseInstance,
      );

      const threadId = 'thread-1';
      const commentId = 'comment-1';

      await store.dispatch(downVoteComment({threadId, commentId}));

      expect(dispatchedActions[0].type).toBe(downVoteComment.pending.type);
      expect(dispatchedActions[1].type).toBe(downVoteComment.rejected.type);
      expect(dispatchedActions[1].payload).toBe('User not logged in');
      expect(mockDownVoteCommentUseCaseInstance.execute).toHaveBeenCalledWith(
          threadId, commentId,
      );
    });
  });

  // Test for neutralVoteComment thunk
  describe('neutralVoteComment', () => {
    it('should dispatch fulfilled action when neutralizing a comment vote is successful', async () => {
      const mockNeutralVoteCommentUseCaseInstance = {
        execute: vi.fn().mockResolvedValue({
          id: 'vote-3',
          userId: 'user-1',
          threadId: 'thread-1',
          voteType: 0,
        }),
      };
      NeutralVoteCommentUseCase.mockImplementationOnce(
          () => mockNeutralVoteCommentUseCaseInstance,
      );

      const threadId = 'thread-1';
      const commentId = 'comment-1';

      await store.dispatch(neutralVoteComment({threadId, commentId}));

      expect(dispatchedActions[0].type).toBe(neutralVoteComment.pending.type);
      expect(dispatchedActions[1].type).toBe(neutralVoteComment.fulfilled.type);
      expect(dispatchedActions[1].payload).toEqual({
        vote: {
          id: 'vote-3',
          userId: 'user-1',
          threadId: 'thread-1',
          voteType: 0,
        },
        commentId,
        threadId,
        currentUserId: 'user-1',
      });
      expect(mockNeutralVoteCommentUseCaseInstance.execute).toHaveBeenCalledWith(
          threadId, commentId,
      );
    });

    it('should dispatch rejected action when neutralizing a comment vote fails', async () => {
      const errorMessage = 'Failed to neutralize comment vote';
      const mockNeutralVoteCommentUseCaseInstance = {
        execute: vi.fn().mockRejectedValue(new Error(errorMessage)),
      };
      NeutralVoteCommentUseCase.mockImplementationOnce(
          () => mockNeutralVoteCommentUseCaseInstance,
      );

      const threadId = 'thread-1';
      const commentId = 'comment-1';

      await store.dispatch(neutralVoteComment({threadId, commentId}));

      expect(dispatchedActions[0].type).toBe(neutralVoteComment.pending.type);
      expect(dispatchedActions[1].type).toBe(neutralVoteComment.rejected.type);
      expect(dispatchedActions[1].payload).toEqual(errorMessage);
      expect(mockNeutralVoteCommentUseCaseInstance.execute).toHaveBeenCalledWith(
          threadId, commentId,
      );
    });

    it('should dispatch rejected action when user not logged in', async () => {
      const mockNeutralVoteCommentUseCaseInstance = {
        execute: vi.fn().mockResolvedValue(false), // Simulate not logged in
      };
      NeutralVoteCommentUseCase.mockImplementationOnce(
          () => mockNeutralVoteCommentUseCaseInstance,
      );

      const threadId = 'thread-1';
      const commentId = 'comment-1';

      await store.dispatch(neutralVoteComment({threadId, commentId}));

      expect(dispatchedActions[0].type).toBe(neutralVoteComment.pending.type);
      expect(dispatchedActions[1].type).toBe(neutralVoteComment.rejected.type);
      expect(dispatchedActions[1].payload).toBe('User not logged in');
      expect(mockNeutralVoteCommentUseCaseInstance.execute).toHaveBeenCalledWith(
          threadId, commentId,
      );
    });
  });
});
