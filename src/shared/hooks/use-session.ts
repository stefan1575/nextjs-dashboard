import { SessionContext } from "@/features/dashboard/components/session-provider";
import { useContext } from "react";

export function useSession() {
  const session = useContext(SessionContext);

  if (session === null) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return session;
}
