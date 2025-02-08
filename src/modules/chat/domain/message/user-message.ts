import Message from "./message";

export default class UserMessage extends Message {
  constructor(content: string) {
    super(content);
    this.role = "user";
  }
}
