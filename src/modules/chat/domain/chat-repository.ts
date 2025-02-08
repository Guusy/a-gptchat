import Chat from "./chat";
import Message from "./message/message";

export interface ChatIncludes {
    messages: boolean
}
export default interface ChatRepository {
  findById(id: string, includes?: ChatIncludes): unknown; //TODO: Chat;

  createChat(chat: Chat): unknown; //TODO: Chat;

  addMessages(id: string, messages: Message[]): unknown;

  getUserChats(userId: string): Chat[];
}
