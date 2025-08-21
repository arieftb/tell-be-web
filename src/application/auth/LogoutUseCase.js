import {AuthRepository} from '../../data/persistence/auth/AuthRepository.js';

export default class LogoutUseCase {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  execute() {
    this.authRepository.removeToken();
  }
}
