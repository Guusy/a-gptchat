import prisma from "@/modules/shared/prisma";
import Chat from "../domain/chat";
import ChatRepository from "../domain/chat-repository";
import { PrismaClient } from "@prisma/client";
import Message from "../domain/message/message";

export default class ChatPrismaRepository implements ChatRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  findById(id: string) {
    return this.prisma.chat.findUnique({ where: { id } });
  }

  createChat({
    id,
    userId,
    messages,
  }: {
    id: string;
    userId: string;
    messages: Message[];
  }) {
    return prisma.chat.create({
      data: {
        id,
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
