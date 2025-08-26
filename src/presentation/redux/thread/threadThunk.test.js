import {configureStore} from '@reduxjs/toolkit';
import {vi} from 'vitest';
import threadReducer, {fetchThreads, fetchThreadDetail, submitComment, submitThread} from './threadSlice';
import AllThreadsUseCase from '../../../application/thread/GetAllThreadsUseCase';
import ThreadDetailUseCase from '../../../application/thread/GetThreadDetailUseCase';
import CommentUseCase from '../../../application/thread/SubmitCommentUseCase';
import {SubmitThreadUseCase} from '../../../application/thread/SubmitThreadUseCase';
import {ThreadRepository} from '../../../data/persistence/thread/ThreadRepository';
import {AuthRepository} from '../../../data/persistence/auth/AuthRepository';

// Mock the AllThreadsUseCase
vi.mock('../../../application/thread/GetAllThreadsUseCase');
vi.mock('../../../application/thread/GetThreadDetailUseCase');
vi.mock('../../../application/thread/SubmitCommentUseCase');
vi.mock('../../../application/thread/SubmitThreadUseCase');
vi.mock('../../../data/persistence/thread/ThreadRepository');
vi.mock('../../../data/persistence/auth/AuthRepository');

describe('fetchThreads thunk', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        threads: threadReducer,
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
