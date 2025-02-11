"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Home() {
  //TODO: style and remote boilerplates clases
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button onClick={() => signIn("google", { callbackUrl: "/chat" })}>
        Login with google
      </Button>
    </div>
  );
}
