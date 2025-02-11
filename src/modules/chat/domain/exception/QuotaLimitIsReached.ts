export class QuotaLimitIsReached extends Error {
  data: unknown;
  constructor(data: unknown = {}) {
    super();
    this.name = "QuotaLimitIsReached";
    this.data = data;
  }
}
