import {
  ThreadRepository,
} from '../../data/persistence/thread/ThreadRepository.js';
import IsLoggedInUseCase from '../auth/IsLoggedInUseCase.js';
import {
  AuthenticationError,
} from '../../domain/auth/model/AuthExceptions.js';

export class UpVoteCommentUseCase {
  constructor() {
    this.threadRepository = new ThreadRepository();
    this.isLoggedInUseCase = new IsLoggedInUseCase();
  }

  async execute(threadId, commentId) {
    if (!this.isLoggedInUseCase.execute()) {
      return false;
    }
    return this.threadRepository.upVoteComment(threadId, commentId);
  }
}
