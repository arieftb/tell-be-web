import { ThreadRepository } from "../../data/persistence/thread/ThreadRepository.js";
import IsLoggedInUseCase from "../auth/IsLoggedInUseCase.js";
import { AuthenticationError } from "../../domain/auth/model/AuthExceptions.js";

export class UpVoteThreadUseCase {
  constructor() {
    this.threadRepository = new ThreadRepository();
    this.isLoggedInUseCase = new IsLoggedInUseCase();
  }

  async execute(threadId) {
    if (!this.isLoggedInUseCase.execute()) {
      throw new AuthenticationError("You must be logged in to vote.");
    }
    return this.threadRepository.upVoteThread(threadId);
  }
}
