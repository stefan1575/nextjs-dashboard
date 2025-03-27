"use client";

import { Button } from "@/shared/components/ui/button";
import { authClient } from "@/shared/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Unplug } from "lucide-react";
import { useRouter } from "next/navigation";

export function RevokeSessionsButton() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => await authClient.revokeOtherSessions(),
    onSuccess: () => router.refresh(),
  });

  const handleRevokeOtherSessions = () => {
    mutate();
  };

  return (
    <>
      {isPending ? (
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
          onClick={handleRevokeOtherSessions}
          disabled={isPending}
        >
          <Unplug />
          Revoke Sessions
        </Button>
      )}
    </>
  );
}
