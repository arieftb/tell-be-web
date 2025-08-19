import { ThreadRepository } from '../../data/persistence/thread/ThreadRepository.js';
import GetAllUsersUseCase from '../user/GetAllUsersUseCase.js';

export default class GetAllThreadsUseCase {
  constructor () {
    this.threadRepository = new ThreadRepository();
    this.getAllUsersUseCase = new GetAllUsersUseCase();
  }

  async execute () {
    const threads = await this.threadRepository.getAllThreads();
    const users = await this.getAllUsersUseCase.execute();

    return threads.map(thread => {
      const owner = users.find(user => user.id === thread.ownerId);
      return {
        ...thread,
        ownerName: owner ? owner.name : 'Unknown',
        ownerAvatar: owner ? owner.avatar : 'https://www.gravatar.com/avatar/?d=mp', // Default avatar
      };
    });
  }
}