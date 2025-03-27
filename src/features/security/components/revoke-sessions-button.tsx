"use client";

import { Button } from "@/shared/components/ui/button";
import { authClient } from "@/shared/lib/auth-client";
import { Loader2, Unplug } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RevokeSessionsButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit() {
    setIsLoading(true);

    await authClient.revokeOtherSessions();

    setIsLoading(false);
    router.refresh();
  }

  return (
    <>
      {isLoading ? (
        <Button
          className="cursor-pointer font-semibold"
          variant="destructive"
          disabled
        >
          <Loader2 className="animate-spin" />
          Loading...
        </Button>
      ) : (
        <Button
          className="cursor-pointer font-semibold"
          variant="destructive"
          onClick={onSubmit}
        >
          <Unplug />
          Revoke Sessions
        </Button>
      )}
    </>
  );
}
