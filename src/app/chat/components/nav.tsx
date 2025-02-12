import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useMemo } from "react";

export default function ChatNav() {
  const { data: session, status } = useSession();
  const isSessionPresent = useMemo(
    () => status === "authenticated" && session.user?.image,
    [status, session]
  );
  
  return (
    <nav className="w-full flex justify-between items-center mb-4">
      <SidebarTrigger />

      <div className="relative inline-block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isSessionPresent ? (
              <Image
                src={session?.user?.image || ""}
                alt="User Logo"
                width={48}
                height={48}
                className={`rounded-full cursor-pointer transition-transform transform hover:scale-110 `}
              />
            ) : (
              <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="p-2 rounded-md shadow-md border border-white bg-black"
          >
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
