"use client";
import { ChatInput } from "@/components/chat-input";
import { useToast } from "@/hooks/use-toast";
import ChatService from "@/lib/service/chat-service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Message } from "./message";
import { LoaderPinwheel } from "lucide-react";
import { AxiosError } from "axios";
import FullScreenLoader from "@/components/full-screen-loader";
import { Message as MessageDomain, Chat as ChatDomain } from "@/shared/types";

export default function Chat({ id }: { id: string }) {
  const [sendingMsg, setSendingMsg] = useState<{ message: string } | null>(
    null
  );
  const [messages, setMessages] = useState<MessageDomain[]>([]);

  const router = useRouter();
  const { toast } = useToast();
  const { data, isLoading, error } = useQuery<ChatDomain>({
    queryKey: ["chat", id],
    queryFn: () => ChatService.getChat(id),
    retry: 1,
  });

  useEffect(() => {
    if (error && (error as AxiosError).status === 404) {
      toast({
        title: "Chat no encontrado",
        variant: "destructive",
        duration: 2000,
      });
      router.push("/chat");
    }
  }, [error, router, toast]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (data) {
      setMessages(data.messages);
    }
  }, [data]);

  const onNewMessages = (newMessages: MessageDomain[]) => {
    setMessages([...messages, ...newMessages]);
  };

  if (isLoading) return <FullScreenLoader size={42} />;
  if (error) return <p></p>;

  return (
    <>
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto min-h-[80vh]">
          <div className="space-y-3">
            {messages.map(
              (msg: { role: string; content: string }, index: number) => (
                <Message key={index} role={msg.role} content={msg.content} />
              )
            )}
            {sendingMsg && (
              <>
                <Message role="user" content={sendingMsg.message} />
                <div className="flex justify-start items-center space-x-2">
                  <LoaderPinwheel
                    className="animate-spin text-grey-500"
                    size={18}
                  />
                </div>
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="sticky dark w-full bottom-0 left-0 shadow-md">
        <ChatInput
          chatId={id}
          setSendingMsg={setSendingMsg}
          newMessages={onNewMessages}
        />
      </div>
    </>
  );
}
