import Message from "./message";

export default class AssistantMessage extends Message {
  constructor(content: string) {
    super(content);
    this.role = "assistant";
  }
}
