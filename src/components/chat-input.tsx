"use client";
import { MAX_TOKENS } from "@/lib/constants";
import chatService from "@/lib/service/chat-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export function ChatInput({
  chatId,
  setSendingMsg = () => {},
}: {
  chatId?: string;
  setSendingMsg?: (msg: { message: string } | null) => void;
}) {
  const [inputText, setInputText] = useState("");
  const wordCount = useMemo(
    () => inputText.trim().split(/\s+/).length,
    [inputText]
  );
  const queryClient = useQueryClient();
  const router = useRouter();

  const sendMessageMutation = useMutation({
    mutationFn: chatService.sendMessage,
    onMutate: () => {
      setSendingMsg({ message: inputText });
    },
    onError: () => {
      setSendingMsg(null);
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
    if (!sendMessageMutation.isPending && wordCount <= MAX_TOKENS) {
      if (inputText.trim()) {
        sendMessageMutation.mutate({ chatId, message: inputText });
      }
    }
  };
  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      return sendMessage();
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    if (wordCount <= MAX_TOKENS) {
      setInputText(text);
    }
  };
  return (
    <>
      {/* TODO: make this with floating at bottom position */}
      <div className="flex justify-center items-center p-4 w-full">
        <div className="relative w-full">
          <textarea
            disabled={sendMessageMutation.isPending}
            value={inputText}
            onChange={onChangeInput}
            onKeyDown={handleKeyDown}
            name="chat-input"
            rows={4}
            placeholder="Escribe tu mensaje..."
            className="w-full p-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-[#323232d9] text-white text-sm placeholder-gray-400 dark:placeholder-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={sendMessage}
            className="absolute right-2 bottom-3 p-2 bg-blue-500 rounded-full hover:bg-blue-600 disabled:bg-gray-400"
            disabled={
              sendMessageMutation.isPending ||
              !inputText.trim() ||
              wordCount > 50
            }
          >
            <Send className="text-white" size={20} />
          </button>

          <span
            className={`absolute bottom-3 left-3 text-xs ${
              wordCount > MAX_TOKENS ? "text-red-500" : "text-gray-400"
            }`}
          >
            {wordCount} / {MAX_TOKENS}
          </span>
        </div>
      </div>
      {sendMessageMutation.error && (
        <div className="p-3 bg-red-500 text-white rounded-lg shadow-md text-center animate-fadeIn mb-2">
          {sendMessageMutation.error.toString()}
        </div>
      )}
    </>
  );
}
