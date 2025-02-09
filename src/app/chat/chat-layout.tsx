"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function ChatLayout({
  chats,
  children,
}: {
  chats: unknown[]; //TODO: type all the unknown pls
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar chats={chats} />
      <SidebarTrigger />
      <main className="flex-1 p-4 overflow-auto">{children}</main>
    </SidebarProvider>
  );
}
