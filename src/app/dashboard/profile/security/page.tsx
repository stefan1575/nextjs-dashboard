import { ProfileSession } from "@/features/security/components/profile-sessions";
import { RevokeSessionsButton } from "@/features/security/components/revoke-sessions-button";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const sessions = await auth.api.listSessions({ headers: await headers() });

  return (
    <div className="max-w-7xl space-y-6">
      <div className="space-y-4 rounded-lg border bg-inherit p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 pb-2">
            <div className="text-lg font-semibold">Sessions</div>
            <p className="text-muted-foreground text-[0.8rem]">
              {"Manage your active sessions and revoke access."}
            </p>
          </div>
          <RevokeSessionsButton />
        </div>
        <ProfileSession sessions={sessions} />
      </div>
    </div>
  );
}
