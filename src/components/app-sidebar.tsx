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
import chatService from "@/lib/service/chat-service";
import { useQuery } from "@tanstack/react-query";
import { SquarePen } from "lucide-react";
import Link from "next/link";

export function AppSidebar({ initialData }) {
  const { data } = useQuery({
    queryKey: ["chats"],
    queryFn: () => chatService.getChats().then( r => r.data),
    initialData: initialData,
    staleTime: 1000 * 60 * 5,
  });

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
              {data.map((chat: { id: string; name: string }) => (
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
