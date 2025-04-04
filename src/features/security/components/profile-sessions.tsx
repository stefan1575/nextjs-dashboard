"use client";

import { SubmitButton } from "@/shared/components/submit-button";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useSession } from "@/shared/hooks/use-session";
import { auth } from "@/shared/lib/auth";
import { authClient } from "@/shared/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Laptop, TabletSmartphone } from "lucide-react";
import { toast } from "sonner";
import { UAParser } from "ua-parser-js";

type token = typeof auth.$Infer.Session.session.token;

export function ProfileSession() {
  const { session: currentSession } = useSession();

  const { data, isPending } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const sessions = await authClient.listSessions();
      return sessions;
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending: isRevoking } = useMutation({
    mutationFn: async (token: token) => {
      await authClient.revokeSession(
        { token },
        {
          onSuccess: () => {
            toast.success("Session Successfully Revoked", {
              description: "Your session from another device has been revoked.",
            });

            queryClient.invalidateQueries({ queryKey: ["sessions"] });
          },
        },
      );
    },
  });

  const handleRevokeOtherSessions = async (token: token) => {
    mutate(token);
  };

  const sessions = data?.data;

  if (!sessions || isPending) {
    return null;
  }

  return (
    <Card className="bg-inherit px-0 py-6 md:px-2 md:py-8">
      <CardHeader className="flex items-center justify-between gap-0.5">
        <div>
          <CardTitle className="text-lg font-semibold">Sessions</CardTitle>
          <CardDescription className="text-muted-foreground hidden text-[0.8rem] md:block">
            {"Update your account's profile information."}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.map((session) => {
          if (!session.userAgent) return;

          const { browser, os, device } = UAParser(session.userAgent);
          return (
            <Card key={session.id} className="bg-inherit">
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="hidden rounded-full border p-2 md:block">
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
                    Current<span className="hidden md:block">Session</span>
                  </Button>
                ) : (
                  <SubmitButton
                    variant="outline"
                    type="button"
                    isLoading={isRevoking}
                    onClick={() => {
                      handleRevokeOtherSessions(session.token);
                    }}
                  >
                    Revoke
                  </SubmitButton>
                )}
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}
