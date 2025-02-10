import { Chat as ChatDB, Message as MessageDB } from "@prisma/client";
import Chat from "../../domain/chat";
import messageMapper from "./message-mapper";

const chatMapper = {
  toDomain(chatDb: ChatDB & { messages?: [MessageDB] }): Chat {
    const messages = chatDb.messages?.map(messageMapper.toDomain) ?? [];
    const chat = new Chat(chatDb.userId, chatDb.name, messages);
    chat.id = chatDb.id;
    return chat;
  },
};

export default chatMapper;
