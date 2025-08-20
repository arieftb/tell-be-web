import { getAllUsers } from '../../infrastructure/user/UserRemoteSource.js';
import User from '../../../domain/user/model/User.js';

export class UserRepository {
  async getAllUsers () {
    try {
      const usersData = await getAllUsers();
      return usersData.map((user) => new User(user));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}
