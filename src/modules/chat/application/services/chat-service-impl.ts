import Chat from "../../domain/chat";
import ChatRepository, { ChatIncludes } from "../../domain/chat-repository";
import ChatService from "../../domain/chat-service";
import { ChatNotFound } from "../../domain/exception/ChatNotFound";
import Message from "../../domain/message/message";
import ChatPrismaRepository from "../../infrastructure/chat-prisma-repository";
export default class ChatServiceImpl implements ChatService {
  chatRepository: ChatRepository;
  constructor() {
    this.chatRepository = new ChatPrismaRepository();
  }

  async getChat(id: string, includes: ChatIncludes): Promise<Chat> {
    const chat = await this.chatRepository.findById(id, includes);

    if (!chat) {
      throw new ChatNotFound({ chatId: id });
    }
    return chat;
  }

  getUserChats(userId: string): Promise<Chat[]> {
    return this.chatRepository.getUserChats(userId)
  }

  async addMessages(chatId: string, messages: Message[]): Promise<Chat> {
    await this.getChat(chatId, {
      messages: false
    }); //TODO: i dont like this...
    return this.chatRepository.addMessages(chatId, messages);
  }
  createChat(chat: Chat): Promise<Chat> {
    return this.chatRepository.createChat(chat);
  }
}
