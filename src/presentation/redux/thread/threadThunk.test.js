import {configureStore} from '@reduxjs/toolkit';
import {vi} from 'vitest';
import threadReducer, {fetchThreads} from './threadSlice';
import AllThreadsUseCase from '../../../application/thread/GetAllThreadsUseCase';

// Mock the AllThreadsUseCase
vi.mock('../../../application/thread/GetAllThreadsUseCase');

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
