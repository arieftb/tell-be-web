import {
  downVoteThread,
  getAllThreads,
  getThreadDetail,
  submitComment,
  submitThread,
  upVoteThread,
} from '../../infrastructure/thread/ThreadRemoteSource.js';
import Thread from '../../../domain/thread/model/Thread.js';
import DetailThread from '../../../domain/thread/model/DetailThread.js';
import Comment from '../../../domain/thread/model/Comment.js';
import Vote from '../../../domain/thread/model/Vote.js';

export class ThreadRepository {
  async getAllThreads() {
    try {
      const threadsData = await getAllThreads();
      return threadsData.map((thread) => new Thread(thread));
    } catch (error) {
      // Handle errors, e.g., network issues, API errors
      console.error('Error fetching threads:', error);
      throw error; // Re-throw or return a specific error type
    }
  }

  async getThreadDetail(threadId) {
    try {
      const threadData = await getThreadDetail(threadId);
      return new DetailThread(threadData);
    } catch (error) {
      console.error(`Error fetching thread detail for ${threadId}:`, error);
      throw error;
    }
  }

  async submitComment(commentPayload) {
    try {
      const commentData = await submitComment(commentPayload);
      return new Comment(commentData);
    } catch (error) {
      console.error('Error submitting comment:', error);
      throw error;
    }
  }

  async submitThread(threadPayload) {
    try {
      const threadData = await submitThread(threadPayload);
      return new Thread(threadData);
    } catch (error) {
      console.error('Error submitting thread:', error);
      throw error;
    }
  }

  async upVoteThread(threadId) {
    try {
      const voteData = await upVoteThread(threadId);
      return new Vote(voteData);
    } catch (error) {
      console.error('Error up voting thread:', error);
      throw error;
    }
  }

  async downVoteThread(threadId) {
    try {
      const voteData = await downVoteThread(threadId);
      return new Vote(voteData);
    } catch (error) {
      console.error('Error down voting thread:', error);
      throw error;
    }
  }
}
