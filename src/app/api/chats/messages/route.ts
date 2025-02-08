import { NextRequest } from "next/server";
import SendMessageUseCase from "@/modules/chat/application/send-message-use-case";
import buildResponse from "../../lib/build-response";
import authService from "@/modules/auth/infrastructure/auth-service-impl";
import ChatServiceImpl from "@/modules/chat/application/service/chat-service-impl";
import buildErrorResponse from "../../lib/build-error-response";

export async function POST(req: NextRequest) {
  try {
    const { chatId, message } = await req.json();
    const userDetails = await authService.getAuthUserDetails();
    const sendMessageUseCase = new SendMessageUseCase(
      new ChatServiceImpl()
    );
    const chat = await sendMessageUseCase.execute(
      chatId,
      message,
      userDetails.id
    );

    return buildResponse({ message: "Message saved", data: chat, status: 201 });
  } catch (error: unknown) {
    return buildErrorResponse(error)
  }
}
