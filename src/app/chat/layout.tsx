"use client";
import chatService from "@/lib/service/chat-service";
import { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import FullScreenLoader from "@/components/full-screen-loader";

export default function ChatPage({ children }: { children: ReactNode }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: () => chatService.getChats().then((r) => r.data),
    staleTime: 1000 * 60 * 5,
  });

  if (error) return <div>Error loading chats</div>;
  return (
    <SidebarProvider>
      <AppSidebar chats={data} />
      <SidebarTrigger />
      <main className="flex-1 p-4 overflow-auto">
        {isLoading ? <FullScreenLoader size={62} /> : children}
      </main>
    </SidebarProvider>
  );
}
