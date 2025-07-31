import { register } from '../../infrastructure/auth/AuthRemoteSource';

export class AuthRepository {

  /**
   * @param {Name} name
   * @param {Email} email
   * @param {Password} password
   * @return {Promise<boolean>}
   */
  async register (
    name,
    email,
    password,
  ) {
    const result = await register(
      name.getValue(),
      email.getValue(),
      password.getValue(),
    );

    console.log(result);

    return (result != null && result.id != null);
  }
}