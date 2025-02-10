import Chat from "./chat";
import { ChatIncludes } from "./chat-repository";
import Message from "./message/message";

export default interface ChatService {

    getChat(id: string, includes?: ChatIncludes ): Promise<Chat>

    addMessages(chatId: string, messages: Message[]): Promise<Chat>
    
    createChat(chat: Chat): Promise<Chat>; 
    
    getUserChats(userId: string): Promise<Chat[]>;
}