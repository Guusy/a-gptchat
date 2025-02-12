import axios, { AxiosError } from "axios";
import { signOut } from "next-auth/react";

const handleAuthError = async (error: AxiosError) => {
  const status = error.response?.status;
  if (status === 401 || status === 403) {
    return signOut();
  }
  throw error;
};

class ChatService {
  async getChat(id: string) {
    return axios.get(`/api/chats/${id}`).catch(handleAuthError);
  }

  async getChats() {
    return axios.get(`/api/chats`).catch(handleAuthError);
  }

  async sendMessage({ message, chatId }: { message: string; chatId?: string }) {
    try {
      const response = await axios.post(`/api/chats/messages`, {
        message,
        chatId,
      });

      return response.data;
    } catch (error: unknown) {
      handleAuthError(error as AxiosError);
      // I dont know if we want to translate to spanish or we could just use the API response msg...
      if ((error as AxiosError)?.status === 429) {
        throw "Has excedido el limite de requests que se pueden hacer en la plataforma, por favor cargue creditos";
      }
      throw "Un error inesperado ocurrio, intente nuevamente";
    }
  }
}

export default new ChatService();
