import axios, { AxiosResponse } from "axios";
import ChatAiClient from "../../domain/chat-ai-client";
import AssistantMessage from "../../domain/message/assistant-message";
import Message from "../../domain/message/message";
import { ChatGptRequest, ChatGptResponse } from "./types";

export default class ChatGptAdapter implements ChatAiClient {
  async sendMessage(
    content: string,
    history: Message[] = []
  ): Promise<Message> {
    try {
      const body: ChatGptRequest = {
        model: "gpt-4o-mini",
        messages: [
          ...history.map((msg) => ({ role: msg.role, content: msg.content })),
          { role: "user", content },
        ],
      };
      const { data }: AxiosResponse<ChatGptResponse> = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        body,
        {
          headers: {
            Authorization: `Bearer ${process.env.OPEN_API_KEY}`,
          },
        }
      );
      const [{ message }] = data.choices;
      return new AssistantMessage(message.content);
    } catch (error) {
      console.log("Error sending AI msg", error);
      throw error;
    }
  }
}
