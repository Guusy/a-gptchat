export class NotValidSession extends Error {
  data: unknown;
  constructor(data: unknown = {}) {
    super();
    this.name = "NotValidSession";
    this.data = data;
  }
}
