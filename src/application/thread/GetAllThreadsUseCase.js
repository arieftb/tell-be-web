import { ThreadRepository } from "../../data/persistence/thread/ThreadRepository.js";
import GetAllUsersUseCase from "../user/GetAllUsersUseCase.js";
import { GetCurrentUserUseCase } from "../user/GetCurrentUserUseCase.js";

export default class GetAllThreadsUseCase {
  constructor() {
    this.threadRepository = new ThreadRepository();
    this.getAllUsersUseCase = new GetAllUsersUseCase();
    this.getCurrentUserUseCase = new GetCurrentUserUseCase();
  }

  async execute() {
    const threads = await this.threadRepository.getAllThreads();
    const users = await this.getAllUsersUseCase.execute();
    const currentUser = await this.getCurrentUserUseCase.execute();
    const currentUserId = currentUser ? currentUser.id : null;

    return threads.map((thread) => {
      const owner = users.find((user) => user.id === thread.ownerId);
      const isUpVotedByCurrentUser = currentUserId
        ? thread.upVotesBy.includes(currentUserId)
        : false;
      const isDownVotedByCurrentUser = currentUserId
        ? thread.downVotesBy.includes(currentUserId)
        : false;

      return {
        ...thread,
        ownerName: owner ? owner.name : "Unknown",
        ownerAvatar: owner
          ? owner.avatar
          : "https://www.gravatar.com/avatar/?d=mp", // Default avatar
        isUpVotedByCurrentUser,
        isDownVotedByCurrentUser,
      };
    });
  }
}
