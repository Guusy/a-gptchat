class ChatService {
  baseUrl: string | undefined;
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL;
  }
  async getChat(id: string) {
    const res = await fetch(`${this.baseUrl}/api/chats/${id}`);
    return res.json().then((r) => r.data); // TODO: find a way to handle 404 with react query
  }

  async getChats() {
    const res = await fetch(`${this.baseUrl}/api/chats`);
    return res.json().then((r) => r.data);
  }
}

export default new ChatService();
