"use client";

import type { StoredSession } from "@/lib/route-types";

const SESSION_KEY = "exclusive-session";

function normalizeBase64(input: string) {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  return padded + "=".repeat((4 - (padded.length % 4)) % 4);
}

export function decodeToken(token: string) {
  try {
    const [, payload] = token.split(".");
    const parsed = JSON.parse(atob(normalizeBase64(payload)));
    return parsed as {
      id?: string;
      name?: string;
      role?: string;
      exp?: number;
    };
  } catch {
    return null;
  }
}

export function getStoredSession(): StoredSession | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredSession;
  } catch {
    return null;
  }
}

export function persistSession(session: StoredSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("exclusive-auth-change"));
}

export function clearStoredSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("exclusive-auth-change"));
}
