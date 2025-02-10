import prisma from "@/modules/shared/prisma";
import Chat from "../domain/chat";
import ChatRepository, { ChatIncludes } from "../domain/chat-repository";
import { PrismaClient } from "@prisma/client";
import Message from "../domain/message/message";
import chatMapper from "../application/mapper/chat-mapper";

export default class ChatPrismaRepository implements ChatRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async findById(
    id: string,
    includes: ChatIncludes | undefined
  ): Promise<Chat | null> {
    //TODO: improve it, and make the sort by createdAt mandatory when the msgs are present
    const includeStatement = includes
      ? { include: { ...includes } }
      : { include: {} };

    const chat = await this.prisma.chat.findUnique({
      where: { id },
      ...includeStatement,
    });
    return chat && chatMapper.toDomain(chat);
  }

  async getUserChats(userId: string): Promise<Chat[]> {
    const chats = await this.prisma.chat.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });
    return chats.map(chatMapper.toDomain);
  }

  async createChat({ id, userId, name, messages }: Chat): Promise<Chat> {
    const chatCreated = await prisma.chat.create({
      data: {
        id,
        name,
        userId,
        messages: { create: messages },
      },
    });
    return chatMapper.toDomain(chatCreated);
  }

  async addMessages(chatId: string, messages: Message[]): Promise<Chat> {
    const chatUpdated = await this.prisma.chat.update({
      where: { id: chatId },
      data: { messages: { createMany: { data: messages } } },
    });

    return chatMapper.toDomain(chatUpdated);
  }
}
