"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { Laptop, Loader2, TabletSmartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UAParser } from "ua-parser-js";

type ProfileSessionProps = {
  sessions: (typeof auth.$Infer.Session.session)[];
  currentSession: typeof auth.$Infer.Session.session;
};

export function ProfileSession({
  sessions,
  currentSession,
}: ProfileSessionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(token: typeof auth.$Infer.Session.session.token) {
    setIsLoading(true);

    await authClient.revokeSession({ token });

    setIsLoading(false);

    router.refresh();
  }
  return (
    <>
      {sessions!.map((session) => {
        // at least one will exist because the user is authenticated
        const { browser, os, device } = UAParser(session.userAgent!);
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
            {session.token === currentSession!.token ? (
              <Button
                className="text-muted-foreground hover:bg-background hover:text-muted-foreground dark:bg-background hover:dark:bg-background"
                variant="outline"
                type="button"
              >
                Current Session
              </Button>
            ) : (
              <>
                {isLoading ? (
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
                      onSubmit(session.token);
                    }}
                    className="cursor-pointer"
                    variant="outline"
                    type="button"
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
