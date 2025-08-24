import {
  ThreadRepository,
} from '../../data/persistence/thread/ThreadRepository.js';
import IsLoggedInUseCase from '../auth/IsLoggedInUseCase.js';

export class NeutralVoteCommentUseCase {
  constructor() {
    this.threadRepository = new ThreadRepository();
    this.isLoggedInUseCase = new IsLoggedInUseCase();
  }

  async execute(threadId, commentId) {
    if (!this.isLoggedInUseCase.execute()) {
      return false;
    }
    return this.threadRepository.neutralVoteComment(threadId, commentId);
  }
}
