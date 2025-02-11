import getChatService from "@/modules/ioc/get-chat-service";
import { NextRequest } from "next/server";
import buildResponse from "../../lib/build-response";
import buildErrorResponse from "../../lib/build-error-response";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {

  try {
    const { id } = await params;

    const chatService = getChatService();
    // const userDetails = await authService.getAuthUserDetails(); //TODO: use it

    const chat = await chatService.getChat(id, { messages: true });

    return buildResponse({
      data: chat,
      status: 200,
    });
  } catch (error) {
    return buildErrorResponse(error);
  }
}
