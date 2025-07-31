import { Name } from '../../domain/user/model/valueobject/Name.js';
import { Email } from '../../domain/user/model/valueobject/Email.js';
import { Password } from '../../domain/auth/model/valueobject/Password.js';

export class RegisterUseCase {
  constructor (authRepository) {
    this._authRepository = authRepository;
  }

  /**
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @return {Promise<boolean>}
   */

  async execute (
    name,
    email,
    password
  ) {
    const _name = new Name(name);
    const _email = new Email(email);
    const _password = new Password(password);

    return await this._authRepository.register(_name, _email, _password);
  }
}