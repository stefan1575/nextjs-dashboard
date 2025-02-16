"use client"

import { useState } from "react";
import { GoogleLogo } from "./icons/google-logo";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export function GoogleButton({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard"
    }, {
      onRequest: () => {
        setIsLoading(true)
      },
      onSuccess: () => {
        setIsLoading(false)
      },
    })
  }

  return (
    isLoading ? (
      <Button type="button" variant="outline" disabled>
        <Loader2 className="animate-spin" />
        Loading...
      </Button>
    ) : (
      <Button onClick={signIn} type="button" variant="outline">
        <GoogleLogo />
        {children}
      </Button>
    )
  )
}