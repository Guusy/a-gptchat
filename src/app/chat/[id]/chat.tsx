"use client";

import { ChatInput } from "@/components/chat-input";
import ChatService from "@/lib/service/chat-service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";


export default function Chat({
  id,
  initialData,
}: {
  id: string;
  initialData: unknown[];
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["chat", id],
    queryFn: () => ChatService.getChat(id),
    initialData,
    staleTime: 1000 * 60 * 5, 
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data])

  console.log('data, isLoading, error', {data, isLoading, error})
  if (isLoading) return <p>Cargando chat...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <div className="flex flex-col h-full p-4 overflow-hidden">
      {/* Nombre del chat */}
      <h1 className="text-xl font-bold pb-4">{data.name}</h1>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {data.messages.map((msg: { role: string, content: string }, index: number) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput />
    </div>
  );
}

export function Message({ role, content }: { role: string; content: string }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-lg max-w-2xl ${
          isUser ? "bg-[#323232d9] text-white border" : "bg-transparent"
        }`}
      >
        <p className="text-sm text-gray-900 dark:text-gray-100">{content}</p>
      </div>
    </div>
  );
}
