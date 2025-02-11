import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Chat } from "@/shared/types";
import { SquarePen } from "lucide-react";
import Link from "next/link";

interface AppSidebarProps {
  chats: Chat[];
}
export function AppSidebar({ chats }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="flex-row justify-between ">
          <SidebarTrigger />
          <div className="flex justify-end p-1">
            <Link href={"/chat"}>
              <SquarePen />
            </Link>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Tus chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats?.map((chat: Chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/chat/${chat.id}`}>
                      {/* TODO:close sidebar on link */}
                      <span>{chat.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
