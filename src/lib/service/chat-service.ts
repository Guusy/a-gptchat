import axios, { AxiosError } from "axios";

class ChatService {

  async getChat(id: string) {
    return axios.get(`/api/chats/${id}`);
  }

  async getChats() {
    return axios.get(`/api/chats`);
  }

  async sendMessage({ message, chatId }: { message: string; chatId?: string }) {
    try {
      const chat = await axios.post(`/api/chats/messages`, { message, chatId });
      return chat.data;
    } catch (error: unknown) {
      // I dont know if we want to translate to spanish or we could just use the API response msg...
      if ((error as AxiosError)?.status === 429) {
        throw "Has excedido el limite de requests que se pueden hacer en la plataforma, por favor cargue creditos";
      }

      throw "Un error inesperado ocurrio, intente nuevamente";
    }
  }
}

export default new ChatService();
