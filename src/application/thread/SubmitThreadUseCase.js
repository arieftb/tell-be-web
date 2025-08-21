import {ThreadPayload} from '../../domain/thread/model/ThreadPayload.js';

export class SubmitThreadUseCase {
  constructor(threadRepository, authRepository) {
    this.threadRepository = threadRepository;
    this.authRepository = authRepository;
  }

  async execute(payload) {
    const threadPayload = new ThreadPayload(payload);
    const token = this.authRepository.getToken();
    if (!token) {
      throw new Error('User not authenticated');
    }

    return this.threadRepository.submitThread(threadPayload);
  }
}
