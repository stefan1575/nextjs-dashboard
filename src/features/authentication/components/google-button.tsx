"use client";

import { GoogleLogo } from "@/shared/components/google-logo";
import { Button } from "@/shared/components/ui/button";
import { authClient } from "@/shared/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export function GoogleButton({ children }: { children: React.ReactNode }) {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    },
  });

  const handleSignIn = () => {
    mutate();
  };

  return isPending ? (
    <Button type="button" variant="outline" className="w-full" disabled>
      <Loader2 className="animate-spin" />
      Loading...
    </Button>
  ) : (
    <Button
      onClick={handleSignIn}
      type="button"
      className="w-full"
      variant="outline"
      disabled={isPending}
    >
      <GoogleLogo />
      {children}
    </Button>
  );
}
