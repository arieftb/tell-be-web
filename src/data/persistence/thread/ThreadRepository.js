import { getAllThreads } from '../../infrastructure/thread/ThreadRemoteSource.js';
import Thread from '../../../domain/thread/model/Thread.js';

export class ThreadRepository {
  async getAllThreads () {
    try {
      const threadsData = await getAllThreads();
      return threadsData.map(thread => new Thread(thread));
    } catch (error) {
      // Handle errors, e.g., network issues, API errors
      console.error('Error fetching threads:', error);
      throw error; // Re-throw or return a specific error type
    }
  }
}