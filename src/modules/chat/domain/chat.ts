import Message from "./message/message";

export default class Chat {
  id?: string;
  userId: string;
  name: string;
  messages: Message[];
  constructor(userId: string, name: string,  messages: Message[] = []) {
    this.userId = userId;
    this.name = name
    this.messages = messages;
  }
}
