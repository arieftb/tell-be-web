export default class CommentPayload {
  constructor(payload) {
    this.threadId = payload.threadId;
    this.content = payload.content;
  }
}
