import { UserRepository } from "../../data/persistence/user/UserRepository.js";

export class GetCurrentUserUseCase {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute() {
    return this.userRepository.getCurrentUser();
  }
}
