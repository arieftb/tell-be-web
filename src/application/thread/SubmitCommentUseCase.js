import { ThreadRepository, } from '../../data/persistence/thread/ThreadRepository.js';
import CommentPayload from '../../domain/thread/model/CommentPayload.js';

export default class SubmitCommentUseCase {
  constructor () {
    this.threadRepository = new ThreadRepository();
  }

  async execute (payload) {
    const commentPayload = new CommentPayload(payload);
    return await this.threadRepository.submitComment(commentPayload);
  }
}
