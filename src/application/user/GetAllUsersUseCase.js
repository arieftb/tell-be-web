import { UserRepository } from '../../data/persistence/user/UserRepository.js';

export default class GetAllUsersUseCase {
  constructor () {
    this.userRepository = new UserRepository();
  }

  async execute () {
    return await this.userRepository.getAllUsers();
  }
}
