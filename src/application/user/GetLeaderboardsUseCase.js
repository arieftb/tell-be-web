import { UserRepository } from "../../data/persistence/user/UserRepository.js";

export default class GetLeaderboardsUseCase {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute() {
    return await this.userRepository.getLeaderboards();
  }
}
