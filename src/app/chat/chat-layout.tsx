"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Chat } from "@/shared/types";

export default function ChatLayout({
  chats,
  children,
}: {
  chats: Chat[];
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar initialData={chats} />
      <SidebarTrigger />
      <main className="flex-1 p-4 overflow-auto">{children}</main>
    </SidebarProvider>
  );
}
