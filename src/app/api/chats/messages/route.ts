import { NextRequest } from "next/server";
import SendMessageUseCase from "@/modules/chat/application/send-message-use-case";
import buildResponse from "../../lib/build-response";
import authService from "@/modules/auth/infrastructure/auth-service-impl";
import buildErrorResponse from "../../lib/build-error-response";
import { RateLimiterMemory } from "rate-limiter-flexible";
import getChatService from "@/modules/ioc/get-chat-service";
import getChatAIClient from "@/modules/ioc/get-chat-ai-client";

// If we want to go to a prod env, we need to handle this in a redis, not in memory
const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 20,
});

export async function POST(req: NextRequest) {
  try {
    const { chatId, message } = await req.json();
    const userDetails = await authService.getAuthUserDetails();
    await rateLimiter.consume(userDetails.id);
    const sendMessageUseCase = new SendMessageUseCase(
      getChatService(),
      getChatAIClient()
    );
    
    const chat = await sendMessageUseCase.execute(
      chatId,
      message,
      userDetails.id
    );

    return buildResponse({ data: chat, status: 201 });
  } catch (error: unknown) {
    return buildErrorResponse(error);
  }
}
