import { ThreadRepository } from '../../data/persistence/thread/ThreadRepository.js';

export default class GetAllThreadsUseCase {
  constructor () {
    this.threadRepository = new ThreadRepository();
  }

  async execute () {
    return await this.threadRepository.getAllThreads();
  }
}