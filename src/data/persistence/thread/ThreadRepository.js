import { getAllThreads, getThreadDetail } from '../../infrastructure/thread/ThreadRemoteSource.js';
import Thread from '../../../domain/thread/model/Thread.js';
import DetailThread from '../../../domain/thread/model/DetailThread.js';

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

  async getThreadDetail (threadId) {
    try {
      const threadData = await getThreadDetail(threadId);
      return new DetailThread(threadData);
    } catch (error) {
      console.error(`Error fetching thread detail for ${threadId}:`, error);
      throw error;
    }
  }
}