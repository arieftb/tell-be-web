import {
  ThreadRepository,
} from '../../data/persistence/thread/ThreadRepository.js';

export default class GetThreadDetailUseCase {
  constructor() {
    this.threadRepository = new ThreadRepository();
  }

  async execute(threadId) {
    const detailThread = await this.threadRepository.getThreadDetail(threadId);
    return {
      id: detailThread.id,
      title: detailThread.title,
      body: detailThread.body,
      category: detailThread.category,
      createdAt: detailThread.createdAt,
      owner: {
        id: detailThread.owner.id,
        name: detailThread.owner.name,
        email: detailThread.owner.email,
        avatar: detailThread.owner.avatar,
      },
      upVotesBy: detailThread.upVotesBy,
      downVotesBy: detailThread.downVotesBy,
      comments: detailThread.comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        owner: {
          id: comment.owner.id,
          name: comment.owner.name,
          email: comment.owner.email,
          avatar: comment.owner.avatar,
        },
        upVotesBy: comment.upVotesBy,
        downVotesBy: comment.downVotesBy,
      })),
    };
  }
}
