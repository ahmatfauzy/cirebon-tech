import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type SessionData = {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  token?: string;
};

export function useSession() {
  const [session, setSession] = useState<SessionData | null | undefined>(
    undefined
  );

  useEffect(() => {
    authClient.getSession().then(({ data }) => setSession(data));
  }, []);

  return session;
}
