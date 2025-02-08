import prisma from "@/modules/shared/prisma";
import Chat from "../domain/chat";
import ChatRepository, { ChatIncludes } from "../domain/chat-repository";
import { PrismaClient } from "@prisma/client";
import Message from "../domain/message/message";

export default class ChatPrismaRepository implements ChatRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  findById(id: string, includes: ChatIncludes | undefined): unknown {
    const includeStatement = includes ? { include: {...includes}} : { include: { }} //TODO: improve it, and make the sort by createdAt mandatory when the msgs are present
    return this.prisma.chat.findUnique({
      where: { id },
      ...includeStatement
    });
  }

  getUserChats(userId: string): Chat[] {
    return this.prisma.chat.findMany({ where: { userId }, orderBy: { updatedAt: 'desc' }});
  }

  createChat({ id, userId, name, messages }: Chata) {
    return prisma.chat.create({
      data: {
        id,
        name,
        userId,
        messages: { create: messages },
      },
    });
  }

  addMessages(chatId: string, messages: Message[]) {
    return this.prisma.chat.update({
      where: { id: chatId },
      data: { messages: { createMany: { data: messages } } },
    });
  }
}
