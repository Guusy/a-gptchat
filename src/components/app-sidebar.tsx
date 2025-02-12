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
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Chat } from "@/shared/types";
import { SquarePen } from "lucide-react";
import Link from "next/link";

interface AppSidebarProps {
  chats: Chat[];
}
export function AppSidebar({ chats }: AppSidebarProps) {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  const onClickSideBarItem = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="flex-row justify-between ">
          <SidebarTrigger />
          <div className="flex justify-end p-1">
            <Link href={"/chat"} onClick={onClickSideBarItem}>
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
                    <Link href={`/chat/${chat.id}`} onClick={onClickSideBarItem}>
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
