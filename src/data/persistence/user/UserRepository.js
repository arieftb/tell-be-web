import {getAllUsers, getLeaderboards, getCurrentUser} from
  '../../infrastructure/user/UserRemoteSource.js';
import User from '../../../domain/user/model/User.js';
import Leaderboard from '../../../domain/leaderboard/model/Leaderboard.js';

export class UserRepository {
  async getAllUsers() {
    try {
      const usersData = await getAllUsers();
      return usersData.map((user) => new User(user));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getLeaderboards() {
    try {
      const leaderboardsData = await getLeaderboards();
      return leaderboardsData.map((leaderboard) =>
        new Leaderboard(leaderboard));
    } catch (error) {
      console.error('Error fetching leaderboards:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const userData = await getCurrentUser();
      return new User(userData);
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }
}
