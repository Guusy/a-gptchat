import ChatAiClient from "../chat/domain/chat-ai-client";
import ChatGptAdapter from "../chat/infrastructure/chat-gpt/chatgpt-adapter";
import ChatgptAdapterStub from "../chat/infrastructure/chat-gpt/chatgpt-adapter-stub";

export default function getChatAIClient(): ChatAiClient {
  const { STUB_AI } = process.env;
  const isDevelopment = STUB_AI === "true";
  if (isDevelopment) {
    return new ChatgptAdapterStub();
  }

  return new ChatGptAdapter();
}
