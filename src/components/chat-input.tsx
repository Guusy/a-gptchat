"use client"
import { useState } from "react";

export function ChatInput() {
  const [inputText, setInputText] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputText.trim()) {
        // TODO: call HTTP with react query
        setInputText("");
      }
    }
  };

  return (
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
  );
}
