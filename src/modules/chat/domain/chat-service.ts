import Chat from "./chat";

export default interface ChatService {
    getChat(id: number): Chat
}