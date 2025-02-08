import Chat from "./chat";
import Message from "./message/message";

export default interface ChatRepository {
  findById(id: string): unknown; //TODO: Chat;

  createChat(chat: Chat): unknown; //TODO: Chat;

  addMessages(id: string, messages: Message[]): unknown;
}
