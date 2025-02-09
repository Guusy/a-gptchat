import ChatServiceImpl from "../chat/application/services/chat-service-impl";
import ChatService from "../chat/domain/chat-service";

export default function getChatService(): ChatService {
  return new ChatServiceImpl();
}
