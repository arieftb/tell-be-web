import { RegisterUseCase } from './RegisterUseCase.js';
import LoginUseCase from './LoginUseCase.js';

export default class RegisterAndLoginUseCase {
  constructor (authRepository) {
    this.registerUseCase = new RegisterUseCase(authRepository);
    this.loginUseCase = new LoginUseCase(authRepository);
  }

  async execute (registrationData) {
    console.log('RegisterAndLoginUseCase: Starting registration...');
    // First, register the user
    await this.registerUseCase.execute(registrationData);
    console.log('RegisterAndLoginUseCase: Registration successful. Proceeding to login...');

    // If registration is successful, then log in the user with the same credentials
    const token = await this.loginUseCase.execute({
      email: registrationData.email,
      password: registrationData.password,
    });
    console.log('RegisterAndLoginUseCase: Login successful. Token obtained.');

    return token;
  }
}