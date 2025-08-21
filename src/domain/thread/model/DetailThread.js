import User from '../../../domain/user/model/User.js';
import Comment from './Comment.js';

export default class DetailThread {
  constructor({
    id, title, body, category, createdAt, owner,
    upVotesBy, downVotesBy, comments,
  }) {
    if (
      !id || !title || !body || !category || !createdAt || !owner ||
      !upVotesBy || !downVotesBy || !comments
    ) {
      throw new Error('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof title !== 'string' ||
      typeof body !== 'string' ||
      typeof category !== 'string' ||
      typeof createdAt !== 'string' ||
      typeof owner !== 'object' ||
      !Array.isArray(upVotesBy) ||
      !Array.isArray(downVotesBy) ||
      !Array.isArray(comments)
    ) {
      throw new Error('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    this.id = id;
    this.title = title;
    this.body = body;
    this.category = category;
    this.createdAt = createdAt;
    this.owner = new User(owner);
    this.upVotesBy = upVotesBy;
    this.downVotesBy = downVotesBy;
    this.comments = comments.map((comment) => new Comment(comment));
  }
}
