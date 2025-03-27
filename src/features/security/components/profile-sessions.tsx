"use client";

import { Button } from "@/shared/components/ui/button";
import { useSession } from "@/shared/hooks/use-session";
import { auth } from "@/shared/lib/auth";
import { authClient } from "@/shared/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Laptop, Loader2, TabletSmartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { UAParser } from "ua-parser-js";

type ProfileSessionProps = {
  sessions: (typeof auth.$Infer.Session.session)[];
};

type token = typeof auth.$Infer.Session.session.token;

export function ProfileSession({ sessions }: ProfileSessionProps) {
  const router = useRouter();
  const { session: currentSession } = useSession();

  const { mutate, isPending } = useMutation({
    mutationFn: async (token: token) =>
      await authClient.revokeSession(
        { token },
        {
          onSuccess: () => router.refresh(),
        },
      ),
  });

  const handleRevokeOtherSessions = async (token: token) => {
    mutate(token);
  };

  return (
    <>
      {sessions.map((session) => {
        if (!session.userAgent) return;

        const { browser, os, device } = UAParser(session.userAgent);
        return (
          <div
            key={session.id}
            className="flex items-center justify-between rounded-lg border bg-inherit p-4"
          >
            <div className="flex items-center space-x-2">
              <div className="rounded-full border p-2">
                {device.is("mobile") ? <TabletSmartphone /> : <Laptop />}
              </div>
              <div className="flex-row">
                <div>{os.name}</div>
                <div className="text-muted-foreground text-xs">
                  {browser.name}
                </div>
              </div>
            </div>
            {session.token === currentSession.token ? (
              <Button
                className="text-muted-foreground hover:bg-background hover:text-muted-foreground dark:bg-background hover:dark:bg-background"
                variant="outline"
                type="button"
              >
                Current Session
              </Button>
            ) : (
              <>
                {isPending ? (
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    type="button"
                    disabled
                  >
                    <Loader2 className="animate-spin" />
                    Loading...
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      handleRevokeOtherSessions(session.token);
                    }}
                    className="cursor-pointer"
                    variant="outline"
                    type="button"
                    disabled={isPending}
                  >
                    Revoke
                  </Button>
                )}
              </>
            )}
          </div>
        );
      })}
    </>
  );
}
