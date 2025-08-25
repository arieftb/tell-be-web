
import threadReducer, {
  fetchThreads,
  fetchThreadDetail,
  submitThread,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
  setSelectedCategory,
} from './threadSlice';

describe('threadSlice', () => {
  const initialState = {
    threads: [],
    status: 'idle',
    error: null,
    detailThread: null,
    detailThreadStatus: 'idle',
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
  };

  it('should handle initial state', () => {
    expect(threadReducer(undefined, {type: 'unknown'})).toEqual(initialState);
  });

  it('should handle setSelectedCategory', () => {
    const actual = threadReducer(
        initialState,
        setSelectedCategory('react'),
    );
    expect(actual.selectedCategory).toEqual('react');
  });

  describe('fetchThreads extra reducers', () => {
    it('should handle fetchThreads.pending', () => {
      const actual = threadReducer(initialState, fetchThreads.pending());
      expect(actual.status).toEqual('loading');
    });

    it('should handle fetchThreads.fulfilled', () => {
      const threads = [{id: 1, title: 'Test Thread'}];
      const actual = threadReducer(
          initialState,
          fetchThreads.fulfilled(threads),
      );
      expect(actual.status).toEqual('succeeded');
      expect(actual.threads).toEqual(threads);
      expect(actual.error).toBeNull();
    });

    it('should handle fetchThreads.rejected', () => {
      const error = 'Failed to fetch threads';
      const action = {type: fetchThreads.rejected.type, payload: error};
      const actual = threadReducer(initialState, action);
      expect(actual.status).toEqual('failed');
      expect(actual.error).toEqual(error);
      expect(actual.threads).toEqual([]);
    });
  });

  describe('fetchThreadDetail extra reducers', () => {
    it('should handle fetchThreadDetail.pending', () => {
      const actual = threadReducer(initialState, fetchThreadDetail.pending());
      expect(actual.detailThreadStatus).toEqual('loading');
    });

    it('should handle fetchThreadDetail.fulfilled', () => {
      const threadDetail = {id: 1, title: 'Test Thread Detail'};
      const actual = threadReducer(
          initialState,
          fetchThreadDetail.fulfilled(threadDetail),
      );
      expect(actual.detailThreadStatus).toEqual('succeeded');
      expect(actual.detailThread).toEqual(threadDetail);
      expect(actual.detailThreadError).toBeNull();
    });

    it('should handle fetchThreadDetail.rejected', () => {
      const error = 'Failed to fetch thread detail';
      const action = {type: fetchThreadDetail.rejected.type, payload: error};
      const actual = threadReducer(initialState, action);
      expect(actual.detailThreadStatus).toEqual('failed');
      expect(actual.detailThreadError).toEqual(error);
      expect(actual.detailThread).toBeNull();
    });
  });

  describe('submitThread extra reducers', () => {
    it('should handle submitThread.pending', () => {
      const actual = threadReducer(initialState, submitThread.pending());
      expect(actual.submitThreadStatus).toEqual('loading');
    });

    it('should handle submitThread.fulfilled', () => {
      const actual = threadReducer(
          initialState,
          submitThread.fulfilled(),
      );
      expect(actual.submitThreadStatus).toEqual('succeeded');
      expect(actual.submitThreadError).toBeNull();
      expect(actual.status).toEqual('idle');
    });

    it('should handle submitThread.rejected', () => {
      const error = 'Failed to submit thread';
      const action = {type: submitThread.rejected.type, payload: error};
      const actual = threadReducer(initialState, action);
      expect(actual.submitThreadStatus).toEqual('failed');
      expect(actual.submitThreadError).toEqual(error);
    });
  });

  describe('upVoteThread extra reducers', () => {
    const threadId = 'thread-1';
    const currentUserId = 'user-1';
    const initialStateWithThread = {
      ...initialState,
      threads: [
        {
          id: threadId,
          upVotesBy: [],
          downVotesBy: [],
          isUpVotedByCurrentUser: false,
          isDownVotedByCurrentUser: false,
        },
      ],
    };

    it('should handle upVoteThread.pending', () => {
      const action = {
        type: upVoteThread.pending.type,
        meta: {arg: {threadId, currentUserId}},
      };
      const actual = threadReducer(initialStateWithThread, action);
      const thread = actual.threads.find((t) => t.id === threadId);
      expect(thread.isUpVotedByCurrentUser).toBe(true);
      expect(thread.upVotesBy).toContain(currentUserId);
      expect(thread.downVotesBy).not.toContain(currentUserId);
    });

    it('should handle upVoteThread.rejected', () => {
      const stateWithOptimisticVote = {
        ...initialState,
        threads: [
          {
            id: threadId,
            upVotesBy: [currentUserId],
            downVotesBy: [],
            isUpVotedByCurrentUser: true,
            isDownVotedByCurrentUser: false,
          },
        ],
      };
      const action = {
        type: upVoteThread.rejected.type,
        meta: {arg: {threadId, currentUserId}},
      };
      const actual = threadReducer(stateWithOptimisticVote, action);
      const thread = actual.threads.find((t) => t.id === threadId);
      expect(thread.isUpVotedByCurrentUser).toBe(false);
      expect(thread.upVotesBy).not.toContain(currentUserId);
    });

    it('should handle upVoteThread.fulfilled', () => {
      const vote = {userId: currentUserId};
      const action = {
        type: upVoteThread.fulfilled.type,
        payload: {vote, threadId},
      };
      const actual = threadReducer(initialStateWithThread, action);
      const thread = actual.threads.find((t) => t.id === threadId);
      expect(thread.isUpVotedByCurrentUser).toBe(true);
      expect(thread.upVotesBy).toContain(currentUserId);
    });
  });

  describe('downVoteThread extra reducers', () => {
    const threadId = 'thread-1';
    const currentUserId = 'user-1';
    const initialStateWithThread = {
      ...initialState,
      threads: [
        {
          id: threadId,
          upVotesBy: [],
          downVotesBy: [],
          isUpVotedByCurrentUser: false,
          isDownVotedByCurrentUser: false,
        },
      ],
    };

    it('should handle downVoteThread.pending', () => {
      const action = {
        type: downVoteThread.pending.type,
        meta: {arg: {threadId, currentUserId}},
      };
      const actual = threadReducer(initialStateWithThread, action);
      const thread = actual.threads.find((t) => t.id === threadId);
      expect(thread.isDownVotedByCurrentUser).toBe(true);
      expect(thread.downVotesBy).toContain(currentUserId);
      expect(thread.upVotesBy).not.toContain(currentUserId);
    });

    it('should handle downVoteThread.rejected', () => {
      const stateWithOptimisticVote = {
        ...initialState,
        threads: [
          {
            id: threadId,
            upVotesBy: [],
            downVotesBy: [currentUserId],
            isUpVotedByCurrentUser: false,
            isDownVotedByCurrentUser: true,
          },
        ],
      };
      const action = {
        type: downVoteThread.rejected.type,
        meta: {arg: {threadId, currentUserId}},
      };
      const actual = threadReducer(stateWithOptimisticVote, action);
      const thread = actual.threads.find((t) => t.id === threadId);
      expect(thread.isDownVotedByCurrentUser).toBe(false);
      expect(thread.downVotesBy).not.toContain(currentUserId);
    });

    it('should handle downVoteThread.fulfilled', () => {
      const vote = {userId: currentUserId};
      const action = {
        type: downVoteThread.fulfilled.type,
        payload: {vote, threadId},
      };
      const actual = threadReducer(initialStateWithThread, action);
      const thread = actual.threads.find((t) => t.id === threadId);
      expect(thread.isDownVotedByCurrentUser).toBe(true);
      expect(thread.downVotesBy).toContain(currentUserId);
    });
  });

  describe('neutralVoteThread extra reducers', () => {
    const threadId = 'thread-1';
    const currentUserId = 'user-1';
    const initialStateWithUpVotedThread = {
      ...initialState,
      threads: [
        {
          id: threadId,
          upVotesBy: [currentUserId],
          downVotesBy: [],
          isUpVotedByCurrentUser: true,
          isDownVotedByCurrentUser: false,
        },
      ],
    };

    const initialStateWithDownVotedThread = {
      ...initialState,
      threads: [
        {
          id: threadId,
          upVotesBy: [],
          downVotesBy: [currentUserId],
          isUpVotedByCurrentUser: false,
          isDownVotedByCurrentUser: true,
        },
      ],
    };

    it('should handle neutralVoteThread.pending when upvoted', () => {
      const action = {
        type: neutralVoteThread.pending.type,
        meta: {arg: {threadId, currentUserId}},
      };
      const actual = threadReducer(initialStateWithUpVotedThread, action);
      const thread = actual.threads.find((t) => t.id === threadId);
      expect(thread.isUpVotedByCurrentUser).toBe(false);
      expect(thread.isDownVotedByCurrentUser).toBe(false);
      expect(thread.upVotesBy).not.toContain(currentUserId);
      expect(thread.downVotesBy).not.toContain(currentUserId);
    });

    it('should handle neutralVoteThread.pending when downvoted', () => {
      const action = {
        type: neutralVoteThread.pending.type,
        meta: {arg: {threadId, currentUserId}},
      };
      const actual = threadReducer(initialStateWithDownVotedThread, action);
      const thread = actual.threads.find((t) => t.id === threadId);
      expect(thread.isUpVotedByCurrentUser).toBe(false);
      expect(thread.isDownVotedByCurrentUser).toBe(false);
      expect(thread.upVotesBy).not.toContain(currentUserId);
      expect(thread.downVotesBy).not.toContain(currentUserId);
    });

    it('should handle neutralVoteThread.rejected when upvoted', () => {
      const action = {
        type: neutralVoteThread.rejected.type,
        meta: {arg: {threadId, currentUserId}},
      };
      const actual = threadReducer(initialStateWithUpVotedThread, action);
      const thread = actual.threads.find((t) => t.id === threadId);
      expect(thread.isUpVotedByCurrentUser).toBe(true);
      expect(thread.upVotesBy).toContain(currentUserId);
    });

    it('should handle neutralVoteThread.rejected when downvoted', () => {
      const action = {
        type: neutralVoteThread.rejected.type,
        meta: {arg: {threadId, currentUserId}},
      };
      const actual = threadReducer(initialStateWithDownVotedThread, action);
      const thread = actual.threads.find((t) => t.id === threadId);
      expect(thread.isDownVotedByCurrentUser).toBe(true);
      expect(thread.downVotesBy).toContain(currentUserId);
    });

    it('should handle neutralVoteThread.fulfilled', () => {
      const vote = {userId: currentUserId};
      const action = {
        type: neutralVoteThread.fulfilled.type,
        payload: {vote, threadId},
      };
      const actual = threadReducer(initialStateWithUpVotedThread, action); // Can use either upvoted or downvoted state
      const thread = actual.threads.find((t) => t.id === threadId);
      expect(thread.isUpVotedByCurrentUser).toBe(false);
      expect(thread.isDownVotedByCurrentUser).toBe(false);
      expect(thread.upVotesBy).not.toContain(currentUserId);
      expect(thread.downVotesBy).not.toContain(currentUserId);
    });
  });

  describe('upVoteComment extra reducers', () => {
    const threadId = 'thread-1';
    const commentId = 'comment-1';
    const currentUserId = 'user-1';
    const initialStateWithComment = {
      ...initialState,
      detailThread: {
        id: threadId,
        comments: [
          {
            id: commentId,
            upVotesBy: [],
            downVotesBy: [],
            isUpVotedByCurrentUser: false,
            isDownVotedByCurrentUser: false,
          },
        ],
      },
    };

    it('should handle upVoteComment.pending', () => {
      const action = {
        type: upVoteComment.pending.type,
        meta: {arg: {threadId, commentId, currentUserId}},
      };
      const actual = threadReducer(initialStateWithComment, action);
      const comment = actual.detailThread.comments.find((c) => c.id === commentId);
      expect(comment.isUpVotedByCurrentUser).toBe(true);
      expect(comment.upVotesBy).toContain(currentUserId);
      expect(comment.downVotesBy).not.toContain(currentUserId);
    });

    it('should handle upVoteComment.rejected', () => {
      const stateWithOptimisticVote = {
        ...initialState,
        detailThread: {
          id: threadId,
          comments: [
            {
              id: commentId,
              upVotesBy: [currentUserId],
              downVotesBy: [],
              isUpVotedByCurrentUser: true,
              isDownVotedByCurrentUser: false,
            },
          ],
        },
      };
      const action = {
        type: upVoteComment.rejected.type,
        meta: {arg: {threadId, commentId, currentUserId}},
      };
      const actual = threadReducer(stateWithOptimisticVote, action);
      const comment = actual.detailThread.comments.find((c) => c.id === commentId);
      expect(comment.isUpVotedByCurrentUser).toBe(false);
      expect(comment.upVotesBy).not.toContain(currentUserId);
    });
  });

  describe('downVoteComment extra reducers', () => {
    const threadId = 'thread-1';
    const commentId = 'comment-1';
    const currentUserId = 'user-1';
    const initialStateWithComment = {
      ...initialState,
      detailThread: {
        id: threadId,
        comments: [
          {
            id: commentId,
            upVotesBy: [],
            downVotesBy: [],
            isUpVotedByCurrentUser: false,
            isDownVotedByCurrentUser: false,
          },
        ],
      },
    };

    it('should handle downVoteComment.pending', () => {
      const action = {
        type: downVoteComment.pending.type,
        meta: {arg: {threadId, commentId, currentUserId}},
      };
      const actual = threadReducer(initialStateWithComment, action);
      const comment = actual.detailThread.comments.find((c) => c.id === commentId);
      expect(comment.isDownVotedByCurrentUser).toBe(true);
      expect(comment.downVotesBy).toContain(currentUserId);
      expect(comment.upVotesBy).not.toContain(currentUserId);
    });

    it('should handle downVoteComment.rejected', () => {
      const stateWithOptimisticVote = {
        ...initialState,
        detailThread: {
          id: threadId,
          comments: [
            {
              id: commentId,
              upVotesBy: [],
              downVotesBy: [currentUserId],
              isUpVotedByCurrentUser: false,
              isDownVotedByCurrentUser: true,
            },
          ],
        },
      };
      const action = {
        type: downVoteComment.rejected.type,
        meta: {arg: {threadId, commentId, currentUserId}},
      };
      const actual = threadReducer(stateWithOptimisticVote, action);
      const comment = actual.detailThread.comments.find((c) => c.id === commentId);
      expect(comment.isDownVotedByCurrentUser).toBe(false);
      expect(comment.downVotesBy).not.toContain(currentUserId);
    });
  });

  describe('neutralVoteComment extra reducers', () => {
    const threadId = 'thread-1';
    const commentId = 'comment-1';
    const currentUserId = 'user-1';
    const initialStateWithUpVotedComment = {
      ...initialState,
      detailThread: {
        id: threadId,
        comments: [
          {
            id: commentId,
            upVotesBy: [currentUserId],
            downVotesBy: [],
            isUpVotedByCurrentUser: true,
            isDownVotedByCurrentUser: false,
          },
        ],
      },
    };

    const initialStateWithDownVotedComment = {
      ...initialState,
      detailThread: {
        id: threadId,
        comments: [
          {
            id: commentId,
            upVotesBy: [],
            downVotesBy: [currentUserId],
            isUpVotedByCurrentUser: false,
            isDownVotedByCurrentUser: true,
          },
        ],
      },
    };

    it('should handle neutralVoteComment.pending when upvoted', () => {
      const action = {
        type: neutralVoteComment.pending.type,
        meta: {arg: {threadId, commentId, currentUserId}},
      };
      const actual = threadReducer(initialStateWithUpVotedComment, action);
      const comment = actual.detailThread.comments.find((c) => c.id === commentId);
      expect(comment.isUpVotedByCurrentUser).toBe(false);
      expect(comment.isDownVotedByCurrentUser).toBe(false);
      expect(comment.upVotesBy).not.toContain(currentUserId);
      expect(comment.downVotesBy).not.toContain(currentUserId);
    });

    it('should handle neutralVoteComment.pending when downvoted', () => {
      const action = {
        type: neutralVoteComment.pending.type,
        meta: {arg: {threadId, commentId, currentUserId}},
      };
      const actual = threadReducer(initialStateWithDownVotedComment, action);
      const comment = actual.detailThread.comments.find((c) => c.id === commentId);
      expect(comment.isUpVotedByCurrentUser).toBe(false);
      expect(comment.isDownVotedByCurrentUser).toBe(false);
      expect(comment.upVotesBy).not.toContain(currentUserId);
      expect(comment.downVotesBy).not.toContain(currentUserId);
    });

    it('should handle neutralVoteComment.rejected when upvoted', () => {
      const action = {
        type: neutralVoteComment.rejected.type,
        meta: {arg: {threadId, commentId, currentUserId}},
      };
      const actual = threadReducer(initialStateWithUpVotedComment, action);
      const comment = actual.detailThread.comments.find((c) => c.id === commentId);
      expect(comment.isUpVotedByCurrentUser).toBe(true);
      expect(comment.upVotesBy).toContain(currentUserId);
    });

    it('should handle neutralVoteComment.rejected when downvoted', () => {
      const action = {
        type: neutralVoteComment.rejected.type,
        meta: {arg: {threadId, commentId, currentUserId}},
      };
      const actual = threadReducer(initialStateWithDownVotedComment, action);
      const comment = actual.detailThread.comments.find((c) => c.id === commentId);
      expect(comment.isDownVotedByCurrentUser).toBe(true);
      expect(comment.downVotesBy).toContain(currentUserId);
    });

    it('should handle neutralVoteComment.fulfilled', () => {
      const vote = {userId: currentUserId};
      const action = {
        type: neutralVoteComment.fulfilled.type,
        payload: {vote, threadId, commentId},
      };
      const actual = threadReducer(initialStateWithUpVotedComment, action); // Can use either upvoted or downvoted state
      const comment = actual.detailThread.comments.find((c) => c.id === commentId);
      expect(comment.isUpVotedByCurrentUser).toBe(false);
      expect(comment.isDownVotedByCurrentUser).toBe(false);
      expect(comment.upVotesBy).not.toContain(currentUserId);
      expect(comment.downVotesBy).not.toContain(currentUserId);
    });
  });

  });
