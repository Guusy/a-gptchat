import { ChatInput } from "@/components/chat-input";

export default function ChatHome() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen  p-4">
      <h1 className="text-3xl font-semibold mb-4">
        En qué puedo ayudarte?
      </h1>
      <div className="w-full max-w-lg rounded-lg shadow-lg p-6">
        <ChatInput />
      </div>
    </div>
  );
}
