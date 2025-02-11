import { AxiosError } from "axios";
import ChatAiClient from "../../domain/chat-ai-client";
import AssistantMessage from "../../domain/message/assistant-message";
import Message from "../../domain/message/message";
import { QuotaLimitIsReached } from "../../domain/exception/QuotaLimitIsReached";

class ChatGptAdapterStub implements ChatAiClient {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendMessage(content: string, history: Message[] = []): Promise<Message> {
    return this.successReponse(content);
  }

  successReponse(content: string): Promise<Message> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(new AssistantMessage(`Te respondo a "${content}"`));
      }, 700);
    });
  }

  failReponse(): Promise<AxiosError> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new QuotaLimitIsReached());
      }, 700);
    });
  }
}

export default ChatGptAdapterStub;
