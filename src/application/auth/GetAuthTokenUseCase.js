import {AuthRepository} from '../../data/persistence/auth/AuthRepository.js';

export default class GetAuthTokenUseCase {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  execute() {
    return this.authRepository.getToken();
  }
}
