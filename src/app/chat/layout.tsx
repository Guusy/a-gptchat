import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ChatLayout from "./chat-layout";
import chatService from "@/lib/service/chat-service";

export default async function ChatPage({ children }) {
  const queryClient = new QueryClient();

  const chats = (await chatService.getChats()).data;
  queryClient.setQueryData(["chats"], chats);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatLayout chats={chats}>{children}</ChatLayout>
    </HydrationBoundary>
  );
}
