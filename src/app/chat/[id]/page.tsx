import Chat from "./components/chat";

export default async function ChatPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <Chat id={id} />;
}
