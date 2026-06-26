"use client";

import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/app/context/AuthContextProvider";

type Step = "email" | "code" | "reset";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { forgotPassword, verifyResetCode, resetPassword } = useContext(AuthContext);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const nextEmail = String(formData.get("email") ?? "");

    try {
      await forgotPassword(nextEmail);
      setEmail(nextEmail);
      setStep("code");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to send reset code.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCodeSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      await verifyResetCode(String(formData.get("resetCode") ?? ""));
      setStep("reset");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Invalid reset code.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResetSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      await resetPassword({
        email,
        newPassword: String(formData.get("newPassword") ?? ""),
      });
      router.push("/");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to reset password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto my-20 w-11/12 max-w-xl rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
      <p className="mb-3 text-sm uppercase tracking-[0.2em] text-exclusive-secondary">Account recovery</p>
      <h1 className="mb-3 font-inter text-3xl font-semibold">Forgot your password?</h1>
      <p className="mb-8 text-sm leading-7 text-neutral-600">
        Follow the same Route API reset flow: send code, verify code, then choose a new password.
      </p>

      {step === "email" ? (
        <form onSubmit={handleEmailSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full rounded border border-black/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-exclusive-secondary/30"
            required
          />
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <button className="rounded bg-exclusive-secondary px-6 py-3 text-white">
            {isSubmitting ? "Sending..." : "Send reset code"}
          </button>
        </form>
      ) : null}

      {step === "code" ? (
        <form onSubmit={handleCodeSubmit} className="space-y-5">
          <p className="text-sm text-neutral-600">A code was requested for {email}.</p>
          <input
            type="text"
            name="resetCode"
            placeholder="Reset code"
            className="w-full rounded border border-black/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-exclusive-secondary/30"
            required
          />
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <button className="rounded bg-exclusive-secondary px-6 py-3 text-white">
            {isSubmitting ? "Verifying..." : "Verify code"}
          </button>
        </form>
      ) : null}

      {step === "reset" ? (
        <form onSubmit={handleResetSubmit} className="space-y-5">
          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            className="w-full rounded border border-black/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-exclusive-secondary/30"
            required
          />
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <button className="rounded bg-exclusive-secondary px-6 py-3 text-white">
            {isSubmitting ? "Updating..." : "Reset password"}
          </button>
        </form>
      ) : null}

      <Link href="/log-in" className="mt-8 inline-block text-sm text-neutral-500 underline underline-offset-4">
        Back to login
      </Link>
    </section>
  );
}
