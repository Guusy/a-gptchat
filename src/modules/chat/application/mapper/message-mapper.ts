import { Message as MessageDB } from "@prisma/client";
import Message from "../../domain/message/message";
import UserMessage from "../../domain/message/user-message";
import AssistantMessage from "../../domain/message/assistant-message";

const messageMapper = {
  toDomain(chatDb: MessageDB): Message {
    let message: Message;
    if (chatDb.role === "user") {
      message = new UserMessage(chatDb.content);
    } else {
      message = new AssistantMessage(chatDb.content);
    }

    return message;
  },
};

export default messageMapper;
