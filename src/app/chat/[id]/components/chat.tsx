"use client";
import { ChatInput } from "@/components/chat-input";
import { useToast } from "@/hooks/use-toast";
import ChatService from "@/lib/service/chat-service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Message } from "./message";
import { LoaderPinwheel } from "lucide-react";
import { Chat as ChatType } from "@/shared/types";

export default function Chat({
  id,
  initialData,
}: {
  id: string;
  initialData: ChatType;
}) {
  const [sendingMsg, setSendingMsg] = useState<{ message: string } | null>(
    null
  );
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!initialData) {
      setTimeout(() => {
        toast({
          title: "Chat no encontrado",
          variant: "destructive",
          duration: 2000,
        });
        //TODO: research why this happen
      }, 0);
      router.push("/chat");
    }
  }, [initialData, router, toast]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["chat", id],
    queryFn: () => ChatService.getChat(id).then((r) => r.data),
    initialData,
    staleTime: 1000 * 60 * 5,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  if (!initialData) return null;
  if (isLoading) return <p>Cargando chat...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col h-full p-4 overflow-hidden">
      {/* Nombre del chat */}
      <h1 className="text-xl font-bold pb-4">{data.name}</h1>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {data.messages.map(
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

      <ChatInput chatId={id} setSendingMsg={setSendingMsg} />
    </div>
  );
}
