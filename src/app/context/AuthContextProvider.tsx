"use client";

import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

import {
  clearStoredSession,
  decodeToken,
  getStoredSession,
  persistSession,
} from "@/lib/auth-storage";
import type { AuthResponse, RouteUser, StoredSession } from "@/lib/route-types";

interface AuthContextValue {
  token: string | null;
  user: (RouteUser & { id?: string }) | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (payload: { email: string; password: string }) => Promise<void>;
  signUp: (payload: {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyResetCode: (resetCode: string) => Promise<void>;
  resetPassword: (payload: { email: string; newPassword: string }) => Promise<void>;
  changePassword: (payload: {
    currentPassword: string;
    password: string;
    rePassword: string;
  }) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

async function request<T>(path: string, init: RequestInit = {}) {
  const response = await fetch(`/api/proxy/${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || "Request failed");
  }

  return payload as T;
}

function toSession(data: AuthResponse): StoredSession {
  const decoded = decodeToken(data.token);

  return {
    token: data.token,
    user: {
      ...data.user,
      id: decoded?.id,
    },
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<StoredSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sync = () => {
      setSession(getStoredSession());
      setIsLoading(false);
    };

    sync();
    window.addEventListener("exclusive-auth-change", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("exclusive-auth-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token: session?.token ?? null,
      user: session?.user ?? null,
      isAuthenticated: Boolean(session?.token),
      isLoading,
      async signIn(payload) {
        const data = await request<AuthResponse>("auth/signin", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        const nextSession = toSession(data);
        persistSession(nextSession);
        setSession(nextSession);
      },
      async signUp(payload) {
        const data = await request<AuthResponse>("auth/signup", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        const nextSession = toSession(data);
        persistSession(nextSession);
        setSession(nextSession);
      },
      async forgotPassword(email) {
        await request("auth/forgotPasswords", {
          method: "POST",
          body: JSON.stringify({ email }),
        });
      },
      async verifyResetCode(resetCode) {
        await request("auth/verifyResetCode", {
          method: "POST",
          body: JSON.stringify({ resetCode }),
        });
      },
      async resetPassword(payload) {
        const data = await request<AuthResponse>("auth/resetPassword", {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        const nextSession = toSession(data);
        persistSession(nextSession);
        setSession(nextSession);
      },
      async changePassword(payload) {
        if (!session?.token) {
          throw new Error("Please log in first");
        }

        const data = await request<AuthResponse>("users/changeMyPassword", {
          method: "PUT",
          headers: {
            token: session.token,
          },
          body: JSON.stringify(payload),
        });

        const nextSession = toSession(data);
        persistSession(nextSession);
        setSession(nextSession);
      },
      signOut() {
        clearStoredSession();
        setSession(null);
      },
    }),
    [isLoading, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
