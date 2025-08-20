import User from '../../../domain/user/model/User.js';

export default class Comment {
  constructor ({ id, content, createdAt, owner, upVotesBy, downVotesBy }) {
    if (!id || !content || !createdAt || !owner || !upVotesBy || !downVotesBy) {
      throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof content !== 'string' ||
      typeof createdAt !== 'string' ||
      typeof owner !== 'object' ||
      !Array.isArray(upVotesBy) ||
      !Array.isArray(downVotesBy)
    ) {
      throw new Error('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.owner = new User(owner);
    this.upVotesBy = upVotesBy;
    this.downVotesBy = downVotesBy;
  }
}
