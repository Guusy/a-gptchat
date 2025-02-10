"use client";
import { ChatInput } from "@/components/chat-input";
import { LoaderPinwheel } from "lucide-react";
import { useState } from "react";

export default function ChatHome() {
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const onCreatingChat = (message: unknown) => {
    console.log("TODO: implement a loader", message);
    if (message) {
      setIsCreatingChat(true);
    }
    // TODO: maybe we could make a create chat endpoint to improve the ux.
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen  p-4">
      {isCreatingChat ? (
        <LoaderPinwheel className="animate-spin text-grey-500" size={24} />
      ) : (
        <h1 className="text-3xl font-semibold mb-4">En qué puedo ayudarte?</h1>
      )}
      <div className="w-full max-w-lg rounded-lg shadow-lg p-6">
        <ChatInput setSendingMsg={onCreatingChat} />
      </div>
    </div>
  );
}
