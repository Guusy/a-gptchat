import AssistantMessage from "../domain/message/assistant-message";
import Message from "../domain/message/message";

interface ChatGptResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
      refusal: string | null;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_tokens_details: {
      cached_tokens: number;
      audio_tokens: number;
    };
    completion_tokens_details: {
      reasoning_tokens: number;
      audio_tokens: number;
      accepted_prediction_tokens: number;
      rejected_prediction_tokens: number;
    };
  };
  service_tier: string;
  system_fingerprint: string;
}

class ChatGptAdapter {
  sendMessage(content: string): Promise<Message> {
    // const messageToSend = { role: "user", content };
    //TODO: make a stub and normal adapter, and move to interface
    const chatGptResponse: ChatGptResponse = {
      id: "chatcmpl-Ay42Vk8liv9GtXtF7EtPdAx5M2WuA",
      object: "chat.completion",
      created: 1738878571,
      model: "gpt-4o-mini-2024-07-18",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: `Te respondo a "${content}"`,
            refusal: null,
          },
          logprobs: null,
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 29,
        completion_tokens: 3,
        total_tokens: 32,
        prompt_tokens_details: {
          cached_tokens: 0,
          audio_tokens: 0,
        },
        completion_tokens_details: {
          reasoning_tokens: 0,
          audio_tokens: 0,
          accepted_prediction_tokens: 0,
          rejected_prediction_tokens: 0,
        },
      },
      service_tier: "default",
      system_fingerprint: "fp_bd83329f63",
    };
    const [{ message }] = chatGptResponse.choices;
    return Promise.resolve(new AssistantMessage(message.content));
  }
}

export default new ChatGptAdapter();
