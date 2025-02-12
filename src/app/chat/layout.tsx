"use client";
import chatService from "@/lib/service/chat-service";
import { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import FullScreenLoader from "@/components/full-screen-loader";
import { SessionProvider } from "next-auth/react";
import ChatNav from "./components/nav";
import ErrorScreen from "@/components/error-screen";

export default function ChatPage({ children }: { children: ReactNode }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: () => chatService.getChats().then((r) => r.data),
    staleTime: 1000 * 60 * 5,
  });

  if (error) return <ErrorScreen />;
  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar chats={data} />
        <main className="flex-1 p-4">
          <ChatNav />
          {isLoading ? <FullScreenLoader size={62} /> : children}
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
}
