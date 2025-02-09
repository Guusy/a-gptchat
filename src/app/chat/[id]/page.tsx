import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ChatService from "@/lib/service/chat-service";
import Chat from "./components/chat";
import { AxiosError } from "axios";

export default async function ChatPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const { id } = await params;
  let chat = null;
  try {
    chat = (await ChatService.getChat(id)).data;
    queryClient.setQueryData(["chat", id], chat);
  } catch (error: unknown) {
    if ((error as AxiosError)?.status === 404) {
      chat = null;
    } else {
      throw error;
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Chat id={id} initialData={chat} />
    </HydrationBoundary>
  );
}
