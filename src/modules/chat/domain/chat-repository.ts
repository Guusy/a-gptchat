import Chat from "./chat";
import Message from "./message/message";

export interface ChatIncludes {
    messages: boolean
}
export default interface ChatRepository {
  findById(id: string, includes?: ChatIncludes): Promise<Chat | null>;

  createChat(chat: Chat): Promise<Chat>;

  addMessages(chat: Chat, messages: Message[]): Promise<Chat>;

  getUserChats(userId: string): Promise<Chat[]>;
}
