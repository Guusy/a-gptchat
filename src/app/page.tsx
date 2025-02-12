"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import withSessionProvider from "./hoc/with-session-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FullScreenLoader from "@/components/full-screen-loader";

function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/chat");
    }
  }, [status, router]);

  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] p-4">
      {status === "loading" ? (
        <FullScreenLoader size={52} />
      ) : (
        <Button onClick={() => signIn("google", { callbackUrl: "/chat" })}>
          Login with google
        </Button>
      )}
    </div>
  );
}

export default withSessionProvider(Home);