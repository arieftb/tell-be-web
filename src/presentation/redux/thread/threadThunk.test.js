import {configureStore} from '@reduxjs/toolkit';
import {vi} from 'vitest';
import threadReducer, {fetchThreads, fetchThreadDetail, submitComment, submitThread, upVoteThread, downVoteThread, neutralVoteThread} from './threadSlice';
import AllThreadsUseCase from '../../../application/thread/GetAllThreadsUseCase';
import ThreadDetailUseCase from '../../../application/thread/GetThreadDetailUseCase';
import CommentUseCase from '../../../application/thread/SubmitCommentUseCase';
import {SubmitThreadUseCase} from '../../../application/thread/SubmitThreadUseCase';
import {UpVoteThreadUseCase} from '../../../application/thread/UpVoteThreadUseCase';
import {DownVoteUC} from '../../../application/thread/DownVoteUC';
import {NeutralVoteThreadUseCase} from '../../../application/thread/NeutralVoteThreadUseCase';
import {ThreadRepository} from '../../../data/persistence/thread/ThreadRepository';
import {AuthRepository} from '../../../data/persistence/auth/AuthRepository';

// Mock the UseCases and Repositories
vi.mock('../../../application/thread/GetAllThreadsUseCase');
vi.mock('../../../application/thread/GetThreadDetailUseCase');
vi.mock('../../../application/thread/SubmitCommentUseCase');
vi.mock('../../../application/thread/SubmitThreadUseCase');
vi.mock('../../../application/thread/UpVoteThreadUseCase');
vi.mock('../../../application/thread/DownVoteUC');
vi.mock('../../../application/thread/NeutralVoteThreadUseCase');
vi.mock('../../../data/persistence/thread/ThreadRepository');
vi.mock('../../../data/persistence/auth/AuthRepository');

describe('fetchThreads thunk', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        threads: threadReducer,
        auth: vi.fn(() => ({user: {id: 'user-1'}})), // Mock auth reducer for current user ID
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should handle successful fetch and update state correctly', async () => {
    // Given: Threads exist in the repository
    const mockThreads = [
      {id: 'thread-1', title: 'Thread 1', body: 'Body 1', category: 'Category A', createdAt: '2023-01-01T00:00:00.000Z', ownerId: 'user-1', totalComments: 0, upVotesBy: [], downVotesBy: []},
      {id: 'thread-2', title: 'Thread 2', body: 'Body 2', category: 'Category B', createdAt: '2023-01-02T00:00:00.000Z', ownerId: 'user-2', totalComments: 0, upVotesBy: [], downVotesBy: []},
    ];
    AllThreadsUseCase.mockImplementation(() => ({
      execute: () => Promise.resolve(mockThreads),
    }));

    // When: fetchThreads is dispatched
    await store.dispatch(fetchThreads());

    // Then: state.status = 'succeeded', state.threads = fetched threads, state.error = null
    const state = store.getState().threads;
    expect(state.status).toBe('succeeded');
    expect(state.threads).toEqual(mockThreads);
    expect(state.error).toBeNull();
  });

  it('should handle failed fetch and update state correctly', async () => {
    // Given: Repository throws an error
    const errorMessage = 'Network Error';
    AllThreadsUseCase.mockImplementation(() => ({
      execute: () => Promise.reject(new Error(errorMessage)),
    }));

    // When: fetchThreads is dispatched
    await store.dispatch(fetchThreads());

    // Then: state.status = 'failed', state.threads = [], state.error = error message
    const state = store.getState().threads;
    expect(state.status).toBe('failed');
    expect(state.threads).toEqual([]);
    expect(state.error).toBe(errorMessage);
  });
});

describe('fetchThreadDetail thunk', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        threads: threadReducer,
        auth: vi.fn(() => ({user: {id: 'user-1'}})),
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should handle successful fetch of thread detail and update state correctly', async () => {
    // Given: Thread with given ID exists
    const threadId = 'thread-1';
    const mockThreadDetail = {id: threadId, title: 'Detail Thread', body: 'Detail Body'};
    ThreadDetailUseCase.mockImplementation(() => ({
      execute: (id) => {
        if (id === threadId) {
          return Promise.resolve(mockThreadDetail);
        }
        return Promise.reject(new Error('Thread not found'));
      },
    }));

    // When: fetchThreadDetail(threadId) is dispatched
    await store.dispatch(fetchThreadDetail(threadId));

    // Then: state.detailThreadStatus = 'succeeded', state.detailThread = fetched thread
    const state = store.getState().threads;
    expect(state.detailThreadStatus).toBe('succeeded');
    expect(state.detailThread).toEqual(mockThreadDetail);
  });

  it('should handle failed fetch of thread detail and update state correctly', async () => {
    // Given: Repository throws an error
    const threadId = 'thread-1';
    const errorMessage = 'Failed to fetch thread detail';
    ThreadDetailUseCase.mockImplementation(() => ({
      execute: () => Promise.reject(new Error(errorMessage)),
    }));

    // When: fetchThreadDetail(threadId) is dispatched
    await store.dispatch(fetchThreadDetail(threadId));

    // Then: state.detailThreadStatus = 'failed', state.detailThread = null, state.detailThreadError = error message
    const state = store.getState().threads;
    expect(state.detailThreadStatus).toBe('failed');
    expect(state.detailThread).toBeNull();
    expect(state.detailThreadError).toBe(errorMessage);
  });
});

describe('submitComment thunk', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        threads: threadReducer,
        auth: vi.fn(() => ({user: {id: 'user-1'}})),
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should handle successful comment submission and update state correctly', async () => {
    // Given: User submits valid comment
    const threadId = 'thread-1';
    const commentData = {threadId, content: 'New Comment'};
    const mockComment = {id: 'comment-1', content: 'New Comment', owner: {id: 'user-1', name: 'User 1'}};

    CommentUseCase.mockImplementation(() => ({
      execute: (data) => {
        if (data.threadId === threadId && data.content === commentData.content) {
          return Promise.resolve(mockComment);
        }
        return Promise.reject(new Error('Invalid comment data'));
      },
    }));

    // Set initial detailThread state for the test
    store.dispatch({
      type: 'threads/fetchThreadDetail/fulfilled',
      payload: {id: threadId, comments: []},
    });

    // When: submitComment(commentData) is dispatched
    await store.dispatch(submitComment(commentData));

    // Then: state.submitCommentStatus = 'succeeded', comment is added to detailThread.comments
    const state = store.getState().threads;
    expect(state.submitCommentStatus).toBe('succeeded');
    expect(state.detailThread.comments).toEqual([mockComment]);
  });

  it('should handle failed comment submission and update state correctly', async () => {
    // Given: Repository throws error
    const threadId = 'thread-1';
    const commentData = {threadId, content: 'New Comment'};
    const errorMessage = 'Failed to submit comment';

    CommentUseCase.mockImplementation(() => ({
      execute: () => Promise.reject(new Error(errorMessage)),
    }));

    // When: submitComment(commentData) is dispatched
    await store.dispatch(submitComment(commentData));

    // Then: state.submitCommentStatus = 'failed', state.submitCommentError = error message
    const state = store.getState().threads;
    expect(state.submitCommentStatus).toBe('failed');
    expect(state.submitCommentError).toBe(errorMessage);
  });
});

describe('submitThread thunk', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        threads: threadReducer,
        auth: vi.fn(() => ({user: {id: 'user-1'}})),
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should handle successful thread submission and update state correctly', async () => {
    // Given: Valid thread data
    const threadData = {title: 'New Thread', body: 'Thread Body', category: 'General'};
    SubmitThreadUseCase.mockImplementation(() => ({
      execute: (data) => {
        if (data.title === threadData.title && data.body === threadData.body) {
          return Promise.resolve(); // No return value expected for successful submission
        }
        return Promise.reject(new Error('Invalid thread data'));
      },
    }));

    // When: submitThread(threadData) is dispatched
    await store.dispatch(submitThread(threadData));

    // Then: state.submitThreadStatus = 'succeeded', state.status = 'idle', state.submitThreadError = null
    const state = store.getState().threads;
    expect(state.submitThreadStatus).toBe('succeeded');
    expect(state.status).toBe('idle');
    expect(state.submitThreadError).toBeNull();
  });

  it('should handle failed thread submission and update state correctly', async () => {
    // Given: Repository or auth throws error
    const threadData = {title: 'New Thread', body: 'Thread Body', category: 'General'};
    const errorMessage = 'Failed to submit thread';

    SubmitThreadUseCase.mockImplementation(() => ({
      execute: () => Promise.reject(new Error(errorMessage)),
    }));

    // When: submitThread(threadData) is dispatched
    await store.dispatch(submitThread(threadData));

    // Then: state.submitThreadStatus = 'failed', state.submitThreadError = error message
    const state = store.getState().threads;
    expect(state.submitThreadStatus).toBe('failed');
    expect(state.submitThreadError).toBe(errorMessage);
  });
});

describe('Thread Vote Thunks', () => {
  let store;
  const threadId = 'thread-1';
  const userId = 'user-1';
  const mockThread = {
    id: threadId,
    upVotesBy: [],
    downVotesBy: [],
    isUpVotedByCurrentUser: false,
    isDownVotedByCurrentUser: false,
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        threads: threadReducer,
        auth: vi.fn(() => ({user: {id: userId}})), // Mock auth reducer for current user ID
      },
      preloadedState: {
        threads: {
          threads: [mockThread],
          detailThread: null,
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // Test cases for upVoteThread
  it('should handle upVoteThread when thread is not voted by user', async () => {
    UpVoteThreadUseCase.mockImplementation(() => ({
      execute: () => Promise.resolve({userId, voteType: 1}),
    }));

    await store.dispatch(upVoteThread(threadId));

    const state = store.getState().threads;
    const updatedThread = state.threads.find((t) => t.id === threadId);
    expect(updatedThread.upVotesBy).toContain(userId);
    expect(updatedThread.isUpVotedByCurrentUser).toBe(true);
    expect(updatedThread.downVotesBy).not.toContain(userId);
    expect(updatedThread.isDownVotedByCurrentUser).toBe(false);
  });

  it('should handle upVoteThread when thread is already upvoted by user (neutralize)', async () => {
    const preloadedState = {
      threads: {
        threads: [{
          ...mockThread,
          upVotesBy: [userId],
          isUpVotedByCurrentUser: true,
        }],
        detailThread: null,
      },
    };

    store = configureStore({
      reducer: {
        threads: threadReducer,
        auth: vi.fn(() => ({user: {id: userId}})),
      },
      preloadedState: preloadedState,
    });

    NeutralVoteThreadUseCase.mockImplementation(() => ({
      execute: () => Promise.resolve({userId, voteType: 0}),
    }));

    await store.dispatch(upVoteThread(threadId));

    const state = store.getState().threads;
    const updatedThread = state.threads.find((t) => t.id === threadId);
    expect(updatedThread.upVotesBy).not.toContain(userId);
    expect(updatedThread.isUpVotedByCurrentUser).toBe(false);
  });

  it('should revert state on upVoteThread failure', async () => {
    const preloadedState = {
      threads: {
        threads: [mockThread],
        detailThread: null,
      },
    };

    store = configureStore({
      reducer: {
        threads: threadReducer,
        auth: vi.fn(() => ({user: {id: userId}})),
      },
      preloadedState: preloadedState,
    });

    UpVoteThreadUseCase.mockImplementation(() => ({
      execute: () => Promise.reject(new Error('Upvote failed')),
    }));

    await store.dispatch(upVoteThread(threadId));

    const state = store.getState().threads;
    const updatedThread = state.threads.find((t) => t.id === threadId);
    expect(updatedThread.upVotesBy).not.toContain(userId);
    expect(updatedThread.isUpVotedByCurrentUser).toBe(false);
  });

  // Test cases for downVoteThread
  it('should handle downVoteThread when thread is not voted by user', async () => {
    DownVoteUC.mockImplementation(() => ({
      execute: () => Promise.resolve({userId, voteType: -1}),
    }));

    await store.dispatch(downVoteThread(threadId));

    const state = store.getState().threads;
    const updatedThread = state.threads.find((t) => t.id === threadId);
    expect(updatedThread.downVotesBy).toContain(userId);
    expect(updatedThread.isDownVotedByCurrentUser).toBe(true);
    expect(updatedThread.upVotesBy).not.toContain(userId);
    expect(updatedThread.isUpVotedByCurrentUser).toBe(false);
  });

  it('should handle downVoteThread when thread is already downvoted by user (neutralize)', async () => {
    const preloadedState = {
      threads: {
        threads: [{
          ...mockThread,
          downVotesBy: [userId],
          isDownVotedByCurrentUser: true,
        }],
        detailThread: null,
      },
    };

    store = configureStore({
      reducer: {
        threads: threadReducer,
        auth: vi.fn(() => ({user: {id: userId}})),
      },
      preloadedState: preloadedState,
    });

    NeutralVoteThreadUseCase.mockImplementation(() => ({
      execute: () => Promise.resolve({userId, voteType: 0}),
    }));

    await store.dispatch(downVoteThread(threadId));

    const state = store.getState().threads;
    const updatedThread = state.threads.find((t) => t.id === threadId);
    expect(updatedThread.downVotesBy).not.toContain(userId);
    expect(updatedThread.isDownVotedByCurrentUser).toBe(false);
  });

  it('should revert state on downVoteThread failure', async () => {
    const preloadedState = {
      threads: {
        threads: [mockThread],
        detailThread: null,
      },
    };

    store = configureStore({
      reducer: {
        threads: threadReducer,
        auth: vi.fn(() => ({user: {id: userId}})),
      },
      preloadedState: preloadedState,
    });

    DownVoteUC.mockImplementation(() => ({
      execute: () => Promise.reject(new Error('Downvote failed')),
    }));

    await store.dispatch(downVoteThread(threadId));

    const state = store.getState().threads;
    const updatedThread = state.threads.find((t) => t.id === threadId);
    expect(updatedThread.downVotesBy).not.toContain(userId);
    expect(updatedThread.isDownVotedByCurrentUser).toBe(false);
  });

  // Test cases for neutralVoteThread
  it('should handle neutralVoteThread when thread is upvoted by user', async () => {
    const preloadedState = {
      threads: {
        threads: [{
          ...mockThread,
          upVotesBy: [userId],
          isUpVotedByCurrentUser: true,
        }],
        detailThread: null,
      },
    };

    store = configureStore({
      reducer: {
        threads: threadReducer,
        auth: vi.fn(() => ({user: {id: userId}})),
      },
      preloadedState: preloadedState,
    });

    NeutralVoteThreadUseCase.mockImplementation(() => ({
      execute: () => Promise.resolve({userId, voteType: 0}),
    }));

    await store.dispatch(neutralVoteThread(threadId));

    const state = store.getState().threads;
    const updatedThread = state.threads.find((t) => t.id === threadId);
    expect(updatedThread.upVotesBy).not.toContain(userId);
    expect(updatedThread.isUpVotedByCurrentUser).toBe(false);
  });

  it('should handle neutralVoteThread when thread is downvoted by user', async () => {
    const preloadedState = {
      threads: {
        threads: [{
          ...mockThread,
          downVotesBy: [userId],
          isDownVotedByCurrentUser: true,
        }],
        detailThread: null,
      },
    };

    store = configureStore({
      reducer: {
        threads: threadReducer,
        auth: vi.fn(() => ({user: {id: userId}})),
      },
      preloadedState: preloadedState,
    });

    NeutralVoteThreadUseCase.mockImplementation(() => ({
      execute: () => Promise.resolve({userId, voteType: 0}),
    }));

    await store.dispatch(neutralVoteThread(threadId));

    const state = store.getState().threads;
    const updatedThread = state.threads.find((t) => t.id === threadId);
    expect(updatedThread.downVotesBy).not.toContain(userId);
    expect(updatedThread.isDownVotedByCurrentUser).toBe(false);
  });

  it('should revert state on neutralVoteThread failure', async () => {
    const preloadedState = {
      threads: {
        threads: [{
          ...mockThread,
          upVotesBy: [userId],
          isUpVotedByCurrentUser: true,
        }],
        detailThread: null,
      },
    };

    store = configureStore({
      reducer: {
        threads: threadReducer,
        auth: vi.fn(() => ({user: {id: userId}})),
      },
      preloadedState: preloadedState,
    });

    NeutralVoteThreadUseCase.mockImplementation(() => ({
      execute: () => Promise.reject(new Error('Neutral vote failed')),
    }));

    await store.dispatch(neutralVoteThread(threadId));

    const state = store.getState().threads;
    const updatedThread = state.threads.find((t) => t.id === threadId);
    expect(updatedThread.upVotesBy).toContain(userId);
    expect(updatedThread.isUpVotedByCurrentUser).toBe(true);
  });
});