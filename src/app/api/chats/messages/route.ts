import { NextRequest, NextResponse } from "next/server";
import SendMessageUseCase from "@/modules/chat/application/send-message-use-case";
import ChatPrismaRepository from "@/modules/chat/infrastructure/chat-prisma-repository";
import buildResponse from "../../lib/buildResponse";

const USER_ID = "cm6wap5i900002845efpd0cce";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { chatId, message } = await req.json();
    const sendMessageUseCase = new SendMessageUseCase(
      new ChatPrismaRepository()
    );
    const chat = await sendMessageUseCase.execute(chatId, message, USER_ID);

    return buildResponse({ message: "Message saved", data: chat, status: 201 });
  } catch (error) {
    return buildResponse({ message: "Unknown error saving the message", data: { error }, status: 500 });
  }
}
