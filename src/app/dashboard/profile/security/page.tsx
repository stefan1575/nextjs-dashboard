import { ProfileSession } from "@/components/profile/profile-sessions";
import { RevokeSessionsButton } from "@/components/revoke-sessions-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const requestHeaders = await headers();

  const sessions = await auth.api.listSessions({ headers: requestHeaders });
  const session = await auth.api.getSession({ headers: requestHeaders });

  return (
    <div className="max-w-7xl space-y-6">
      <div className="space-y-4 rounded-lg border bg-inherit p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 pb-2">
            <div className="text-lg font-semibold">Sessions</div>
            <p className="text-muted-foreground text-[0.8rem] sm:hidden">
              {"Manage your active sessions and revoke access."}
            </p>
          </div>
          <RevokeSessionsButton />
        </div>
        <ProfileSession currentSession={session!.session} sessions={sessions} />
      </div>
    </div>
  );
}
