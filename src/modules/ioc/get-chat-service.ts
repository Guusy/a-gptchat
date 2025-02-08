import ChatServiceImpl from "../chat/application/service/chat-service-impl";
import ChatService from "../chat/domain/chat-service";

export default function getChatService(): ChatService {
  return new ChatServiceImpl();
}
