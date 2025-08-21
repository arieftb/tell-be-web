export default class Thread {
  constructor({
    id, title, body, category, createdAt, ownerId,
    totalComments = 0, upVotesBy = [], downVotesBy = [],
  }) {
    if (
      !id || !title || !body || !category || !createdAt || !ownerId
    ) {
      throw new Error('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof title !== 'string' ||
      typeof body !== 'string' ||
      typeof category !== 'string' ||
      typeof createdAt !== 'string' ||
      typeof ownerId !== 'string' ||
      typeof totalComments !== 'number' ||
      !Array.isArray(upVotesBy) ||
      !Array.isArray(downVotesBy)
    ) {
      throw new Error('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    this.id = id;
    this.title = title;
    this.body = body;
    this.category = category;
    this.createdAt = createdAt;
    this.ownerId = ownerId;
    this.totalComments = totalComments;
    this.upVotesBy = upVotesBy;
    this.downVotesBy = downVotesBy;
  }
}
