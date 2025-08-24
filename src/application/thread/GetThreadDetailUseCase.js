import {
  ThreadRepository,
} from '../../data/persistence/thread/ThreadRepository.js';
import {GetCurrentUserUseCase} from '../user/GetCurrentUserUseCase.js';

export default class GetThreadDetailUseCase {
  constructor() {
    this.threadRepository = new ThreadRepository();
    this.getCurrentUserUseCase = new GetCurrentUserUseCase();
  }

  async execute(threadId) {
    const detailThread = await this.threadRepository.getThreadDetail(threadId);
    let currentUserId = null;
    try {
      const currentUser = await this.getCurrentUserUseCase.execute();
      currentUserId = currentUser ? currentUser.id : null;
    } catch (error) {
      // If fetching current user fails (e.g., not logged in), currentUserId remains null
      console.warn('Could not fetch current user for vote status check:', error.message);
    }

    return {
      id: detailThread.id,
      title: detailThread.title,
      body: detailThread.body,
      category: detailThread.category,
      createdAt: detailThread.createdAt,
      owner: {
        id: detailThread.owner.id,
        name: detailThread.owner.name,
        email: detailThread.owner.email,
        avatar: detailThread.owner.avatar,
      },
      upVotesBy: detailThread.upVotesBy,
      downVotesBy: detailThread.downVotesBy,
      comments: detailThread.comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        owner: {
          id: comment.owner.id,
          name: comment.owner.name,
          email: comment.owner.email,
          avatar: comment.owner.avatar,
        },
        upVotesBy: comment.upVotesBy,
        downVotesBy: comment.downVotesBy,
        isUpVotedByCurrentUser: currentUserId ? comment.upVotesBy.includes(currentUserId) : false,
        isDownVotedByCurrentUser: currentUserId ? comment.downVotesBy.includes(currentUserId) : false,
      })),
    };
  }
}
