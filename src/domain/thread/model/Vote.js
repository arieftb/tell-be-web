export default class Vote {
  constructor({ id, userId, threadId, voteType }) {
    if (!id || !userId || !threadId || voteType === undefined) {
      throw new Error("VOTE.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof userId !== "string" ||
      typeof threadId !== "string" ||
      typeof voteType !== "number"
    ) {
      throw new Error("VOTE.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    this.id = id;
    this.userId = userId;
    this.threadId = threadId;
    this.voteType = voteType;
  }
}
