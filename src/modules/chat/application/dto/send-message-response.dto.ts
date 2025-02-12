import Chat from "../../domain/chat";
import Message from "../../domain/message/message";

export default interface SendMessageResponseDto {
  chat: Chat;
  newMessage: Message;
}
