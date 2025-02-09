import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ChatLayout from "./chat-layout";
import chatService from "@/lib/service/chat-service";

export default async function ChatPage({ children }) {
  const queryClient = new QueryClient();

  const chats = await chatService.getChats();
  queryClient.setQueryData(["chat"], chats);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatLayout chats={chats}>{children}</ChatLayout>
    </HydrationBoundary>
  );
}
