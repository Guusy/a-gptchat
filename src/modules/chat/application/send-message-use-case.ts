import ChatRepository from "../domain/chat-repository";
import AssistantMessage from "../domain/message/assistant-message";
import UserMessage from "../domain/message/user-message";
import chatgptAdapter from "../infrastructure/chatgpt-adapter";

export default class SendMessageUseCase {
  constructor(private chatRepository: ChatRepository) {}
  async execute(chatId: string, content: string, userId: string) {
    const assistantMessage = await chatgptAdapter.sendMessage(content);
    // const chat = await this.chatRepository.findById(chatId); //TODO make 404 error handling
    const messages = [new UserMessage(content), assistantMessage];
    if (chatId) {
      return this.chatRepository.addMessages(chatId, messages);
    }
    return this.chatRepository.createChat({
      userId: userId,
      messages,
    });
  }
}
