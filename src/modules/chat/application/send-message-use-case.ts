import Chat from "../domain/chat";
import ChatService from "../domain/chat-service";
import UserMessage from "../domain/message/user-message";
import chatgptAdapter from "../infrastructure/chatgpt-adapter";

export default class SendMessageUseCase {
  constructor(private chatService: ChatService) {}
  async execute(chatId: string, content: string, userId: string) : Promise<Chat> {
    const userMessage = new UserMessage(content);
    if (chatId) {
      const chat : Chat = await this.chatService.getChat(chatId, { messages: true });
      const history = chat.getLastMessages();
      const assistantMessage = await chatgptAdapter.sendMessage(
        content,
        history
      );
      return this.chatService.addMessages(chatId, [
        userMessage,
        assistantMessage,
      ]);
    }
    const assistantMessage = await chatgptAdapter.sendMessage(content);
    const chatName = content.split(" ").slice(0, 8).join(" ");
    return this.chatService.createChat(
      new Chat(userId, chatName, [userMessage, assistantMessage])
    );
  }
}
