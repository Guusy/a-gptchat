export class MaxTokenLimit extends Error {
  data: unknown;
  constructor(data: unknown) {
    super();
    this.name = "MaxTokenLimit";
    this.data = data;
  }
}
