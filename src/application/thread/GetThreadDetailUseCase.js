import { ThreadRepository, } from '../../data/persistence/thread/ThreadRepository.js';

export default class GetThreadDetailUseCase {
  constructor () {
    this.threadRepository = new ThreadRepository();
  }

  async execute (threadId) {
    return await this.threadRepository.getThreadDetail(threadId);
  }
}
