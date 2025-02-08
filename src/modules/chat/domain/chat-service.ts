import Chat from "./chat";
import { ChatIncludes } from "./chat-repository";
import Message from "./message/message";

export default interface ChatService {

    getChat(id: string, includes?: ChatIncludes ): Chat

    addMessages(chatId: string, messages: Message[]): unknown
    
    createChat(chat: Chat): unknown; //TODO: Chat;
    
    getUserChats(userId: string): unknown; //TODO: Chat;
}