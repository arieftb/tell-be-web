import { register } from '../../infrastructure/auth/AuthRemoteSource.js';
import { DuplicateEmailError, RegistrationError } from '../../../domain/auth/model/AuthExceptions.js';

export class AuthRepository {
  async registerUser (registerPayload) {
    try {
      return await register({
        name: registerPayload.name.getValue(),
        email: registerPayload.email.getValue(),
        password: registerPayload.password.getValue(),
      });
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
        if (status === 'fail' && message === 'Email is already taken') {
          throw new DuplicateEmailError('This email is already in use.');
        }
        throw new RegistrationError('Failed to register. Please try again.');
      }
      throw new RegistrationError('Network error. Please check your connection.');
    }
  }
}
