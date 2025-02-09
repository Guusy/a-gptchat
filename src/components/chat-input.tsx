"use client";
import chatService from "@/lib/service/chat-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

export function ChatInput({
  chatId,
  setSendingMsg,
}: {
  chatId?: string;
  setSendingMsg: Dispatch<SetStateAction<{ message: string } | null>>;
}) {
  const [inputText, setInputText] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const sendMessageMutation = useMutation({
    mutationFn: chatService.sendMessage,
    onMutate: () => {
      setSendingMsg({ message: inputText });
    },
    onSuccess: async ({ data }) => {
      setInputText("");
      setSendingMsg(null);
      if (chatId) {
        queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
      } else {
        await queryClient.invalidateQueries({ queryKey: ["chats"] });
        router.replace(`/chat/${data.id}`);
      }
    },
  });

  const sendMessage = async () => {
    if (!sendMessageMutation.isPending) {
      if (inputText.trim()) {
        await sendMessageMutation.mutate({ chatId, message: inputText });
      }
    }
  };
  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      return sendMessage();
    }
  };

  return (
    <>
      {/* TODO: make this with floating at bottom position */}
      <div className="flex justify-center items-center p-4 w-full">
        <textarea
          disabled={sendMessageMutation.isPending}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Escribe tu mensaje..."
          className="w-full p-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-[#323232d9] text-white text-sm placeholder-gray-400 dark:placeholder-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-2 bg-blue-500 rounded-full hover:bg-blue-600 disabled:bg-gray-400"
          disabled={sendMessageMutation.isPending || !inputText.trim()}
        >
          <Send className="text-white" size={20} />
        </button>
      </div>
      {sendMessageMutation.error && (
        <>Hubo un error intentando procesar tu request, vuelve a intentar</>
      )}
    </>
  );
}
