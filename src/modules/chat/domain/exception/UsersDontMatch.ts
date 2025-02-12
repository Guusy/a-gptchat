export class UsersDontMatch extends Error {
  data: unknown;
  constructor(data: unknown = {}) {
    super();
    this.name = "UsersDontMatch";
    this.data = data;
  }
}
