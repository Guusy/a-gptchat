import ChatService from "../domain/chat-service";
import UserMessage from "../domain/message/user-message";
import chatgptAdapter from "../infrastructure/chatgpt-adapter";

export default class SendMessageUseCase {
  constructor(private chatService: ChatService) {}
  async execute(chatId: string, content: string, userId: string) {
    const assistantMessage = await chatgptAdapter.sendMessage(content);
    // const chat = await this.chatRepository.findById(chatId); //TODO make 404 error handling
    const messages = [new UserMessage(content), assistantMessage];
    if (chatId) {
      return this.chatService.addMessages(chatId, messages);
    }
    //TODO: improve name
    return this.chatService.createChat({
      name: content.split(" ").slice(0, 8).join(" "),
      userId: userId,
      messages,
    });
  }
}
