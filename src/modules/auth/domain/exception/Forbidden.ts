export class Forbidden extends Error {
  data: unknown;
  constructor(data: unknown = {}) {
    super();
    this.name = "Forbidden";
    this.data = data;
  }
}
