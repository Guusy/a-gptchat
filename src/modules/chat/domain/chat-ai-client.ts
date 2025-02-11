import Message from "./message/message";

export default interface ChatAiClient {
  sendMessage(content: string, history?: Message[]): Promise<Message>;
}
