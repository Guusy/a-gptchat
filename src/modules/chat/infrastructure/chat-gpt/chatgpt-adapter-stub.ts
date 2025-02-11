import ChatAiClient from "../../domain/chat-ai-client";
import AssistantMessage from "../../domain/message/assistant-message";
import Message from "../../domain/message/message";

class ChatGptAdapterStub implements ChatAiClient {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendMessage(content: string, history: Message[] = []): Promise<Message> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(new AssistantMessage(`Te respondo a "${content}"`));
      }, 700);
    });
  }
}

export default ChatGptAdapterStub;
