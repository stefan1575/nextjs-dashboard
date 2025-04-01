"use client";

import { authClient } from "@/shared/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";

type SessionContext = typeof authClient.$Infer.Session | null;

export const SessionContext = createContext<SessionContext>(null);

type SessionProviderProps = {
  children: React.ReactNode;
};

export function SessionProvider({ children }: SessionProviderProps) {
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const session = await authClient.getSession();
      return session;
    },
  });

  const session = data?.data;

  if (!session) {
    return null;
  }

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
