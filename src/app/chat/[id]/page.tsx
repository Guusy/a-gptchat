import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import ChatService from '@/lib/service/chat-service';
import Chat from './chat';

export default async function ChatPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const { id } = await params
  const chatData = await ChatService.getChat(id);
  queryClient.setQueryData(['chat', id], chatData);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Chat id={id} initialData={chatData} />
    </HydrationBoundary>
  );
}
