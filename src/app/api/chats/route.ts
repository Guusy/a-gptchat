import authService from "@/modules/auth/infrastructure/auth-service-impl";
import buildResponse from "../lib/build-response";
import buildErrorResponse from "../lib/build-error-response";
import getChatService from "@/modules/ioc/get-chat-service";

export async function GET() {
  try {
    const userDetails = await authService.getAuthUserDetails();
    const chatService =  getChatService()

    const chats = await chatService.getUserChats(userDetails.id)

    return buildResponse({ data: chats, status: 200 })
  } catch (error) {
    return buildErrorResponse(error)

  }
}
