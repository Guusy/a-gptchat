import axios from "axios";
class ChatService {
  baseUrl: string | undefined;
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL;
  }
  async getChat(id: string) {
    return axios.get(`${this.baseUrl}/api/chats/${id}`);
  }

  async getChats() {
    return axios.get(`${this.baseUrl}/api/chats`);
  }

  async sendMessage({ message, chatId }: { message: string; chatId?: string }) {
    return axios.post(`/api/chats/messages`, { message, chatId });
  }
}

export default new ChatService();
