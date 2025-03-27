"use client";

import { auth } from "@/shared/lib/auth";
import { createContext } from "react";

type SessionContext = {
  session: Awaited<ReturnType<typeof auth.api.getSession>>;
};

export const SessionContext = createContext<SessionContext>({
  session: null,
});

type SessionProviderProps = {
  children: React.ReactNode;
  session: SessionContext["session"];
};

export function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}
