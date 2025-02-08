import Message from "./message/message";

export default class Chat {
  id?: string;
  userId: string;
  messages: Message[];
  constructor(userId: string, messages: Message[] = []) {
    this.userId = userId;
    this.messages = messages;
  }
}
