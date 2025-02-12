export default function ErrorScreen() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="mb-4">
          There was an error loading the chats. Please try again later.
        </p>
      </div>
    </div>
  );
}
