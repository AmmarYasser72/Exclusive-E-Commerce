"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useMemo, useState } from "react";

import { AuthContext } from "@/app/context/AuthContextProvider";

export default function Page() {
  const router = useRouter();
  const { signIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectTarget = useMemo(() => {
    if (typeof window === "undefined") return "/";
    return new URLSearchParams(window.location.search).get("redirect") || "/";
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      await signIn({
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      });

      router.push(redirectTarget);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to sign in right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col lg:mt-16 lg:mb-16 lg:flex-row">
      <div className="mb-16 lg:mb-0 lg:w-[50%] xl:flex-1 2xl:flex-none">
        <Image
          src="/signup-login/shop-blue-background.svg"
          alt="Blue shopping illustration"
          width={400}
          height={500}
          priority
          className="h-auto w-full"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col items-center mb-16 mx-6 md:mx-20 lg:items-start lg:justify-center 2xl:mx-auto"
      >
        <h2 className="font-inter text-4xl font-medium mb-2 text-center lg:text-left">
          Log in to Exclusive
        </h2>
        <p className="mb-10 text-center lg:text-left">Use your Route API account credentials.</p>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email Address"
          autoComplete="email"
          className="bg-transparent border-b border-[#a5a5a5] w-full mb-8 py-2 focus:outline-none"
          required
        />

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          className="bg-transparent border-b border-[#a5a5a5] w-full mb-3 py-2 focus:outline-none"
          required
        />

        {error ? <p className="mb-5 text-sm text-red-500">{error}</p> : null}

        <div className="flex w-full items-center justify-between gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-exclusive-secondary px-8 py-3 text-white transition hover:bg-exclusive-secondary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
          <Link href="/forgot-password" className="text-exclusive-secondary">
            Forgot password?
          </Link>
        </div>

        <div className="mt-8 text-sm opacity-80">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline underline-offset-4">
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
}
