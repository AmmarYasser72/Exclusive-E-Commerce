"use client";

import { ReactNode } from "react";

import { AuthProvider } from "@/app/context/AuthContextProvider";
import { CartAndWishlistProvider } from "@/app/context/CartAndWishlistContextProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartAndWishlistProvider>
        <ErrorBoundary
          fallback={
            <header className="border-b border-black/10 p-6 text-center text-sm">
              Navigation is temporarily unavailable.
            </header>
          }
        >
          <Header />
        </ErrorBoundary>

        <ErrorBoundary>{children}</ErrorBoundary>

        <ErrorBoundary
          fallback={
            <footer className="bg-black p-8 text-center text-sm text-white">
              Footer is temporarily unavailable.
            </footer>
          }
        >
          <Footer />
        </ErrorBoundary>
      </CartAndWishlistProvider>
    </AuthProvider>
  );
}
