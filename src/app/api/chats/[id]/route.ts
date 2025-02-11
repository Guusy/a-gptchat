import getChatService from "@/modules/ioc/get-chat-service";
import { NextRequest } from "next/server";
import buildResponse from "../../lib/build-response";
import buildErrorResponse from "../../lib/build-error-response";
import authService from "@/modules/auth/infrastructure/auth-service-impl";
import { Forbidden } from "@/modules/auth/domain/exception/Forbidden";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const user = await authService.getAuthUserDetails();

    const chatService = getChatService();

    const chat = await chatService.getChat(id, { messages: true });
    if (chat.userId !== user.id) {
      // TODO: handle the 403 case in the FE
      throw new Forbidden();
    }

    return buildResponse({
      data: chat,
      status: 200,
    });
  } catch (error) {
    return buildErrorResponse(error);
  }
}
