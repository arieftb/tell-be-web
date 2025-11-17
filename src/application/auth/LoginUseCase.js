import { AuthRepository } from "../../data/persistence/auth/AuthRepository.js";
import LoginPayload from "../../domain/auth/model/LoginPayload.js";

export default class LoginUseCase {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async execute(payload) {
    const loginPayload = new LoginPayload(payload);
    return await this.authRepository.loginUser(loginPayload);
  }
}
