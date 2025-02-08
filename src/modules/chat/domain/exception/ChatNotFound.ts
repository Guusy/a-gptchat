export class ChatNotFound extends Error {
  data: unknown;
  constructor(data: unknown) {
    super();
    this.name = 'ChatNotFound'
    this.data = data
  }
}