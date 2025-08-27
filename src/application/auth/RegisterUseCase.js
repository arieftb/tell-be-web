import RegisterPayload from "../../domain/auth/model/RegisterPayload.js";

export class RegisterUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(registerData) {
    const payload = new RegisterPayload(registerData);
    return await this.authRepository.registerUser(payload);
  }
}
