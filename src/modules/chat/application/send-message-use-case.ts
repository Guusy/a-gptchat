import Chat from "../domain/chat";
import ChatAiClient from "../domain/chat-ai-client";
import ChatService from "../domain/chat-service";
import { MaxTokenLimit } from "../domain/exception/MaxTokenLimit";
import { UsersDontMatch } from "../domain/exception/UsersDontMatch";
import UserMessage from "../domain/message/user-message";

export default class SendMessageUseCase {
  constructor(
    private chatService: ChatService,
    private chatAiClient: ChatAiClient
  ) {}
  async execute(
    chatId: string,
    content: string,
    userId: string
  ): Promise<Chat> {
    const userMessage = new UserMessage(content);

    if (userMessage.exceedsMaxTokenLimit()) {
      throw new MaxTokenLimit({ tokens: userMessage.getTokens() });
    }

    if (chatId) {
      const chat: Chat = await this.chatService.getChat(chatId, {
        messages: true,
      });
      if (!chat.isOwner(userId)) {
        throw new UsersDontMatch();
      }
      const history = chat.getLastMessages();
      const assistantMessage = await this.chatAiClient.sendMessage(
        content,
        history
      );
      return this.chatService.addMessages(chatId, [
        userMessage,
        assistantMessage,
      ]);
    }
    const assistantMessage = await this.chatAiClient.sendMessage(content);
    const chatName = content.split(" ").slice(0, 8).join(" ");
    return this.chatService.createChat(
      new Chat(userId, chatName, [userMessage, assistantMessage])
    );
  }
}
