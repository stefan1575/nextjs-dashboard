"use client";

import { authClient } from "@/shared/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";

type SessionContext = {
  session: Awaited<ReturnType<typeof authClient.getSession>>;
};

export const SessionContext = createContext<SessionContext>({
  session: null,
});

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
    throw Error("Session: session not found.");
  }

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}
