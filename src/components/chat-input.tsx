"use client";
import chatService from "@/lib/service/chat-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ChatInput({ chatId }: { chatId?: string }) {
  const [inputText, setInputText] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const sendMessageMutation = useMutation({
    mutationFn: chatService.sendMessage,
    onSuccess: async ({ data }) => {
      setInputText("");
      if (chatId) {
        queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
      } else {
        await queryClient.invalidateQueries({ queryKey: ["chats"] });
        router.replace(`/chat/${data.id}`);
      }
    },
  });

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputText.trim()) {
        await sendMessageMutation.mutate({ chatId, message: inputText });
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center p-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Escribe tu mensaje..."
          className="w-full max-w-xl p-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-[#323232d9] text-white text-sm placeholder-gray-400 dark:placeholder-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {sendMessageMutation.error && (
        <>Hubo un error intentando procesar tu request, vuelve a intentar</>
      )}
    </>
  );
}
