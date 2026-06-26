"use client";

import { FormEvent, useContext, useState } from "react";

import { AuthContext } from "@/app/context/AuthContextProvider";

export default function ChangePasswordPage() {
  const { changePassword } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      await changePassword({
        currentPassword: String(formData.get("currentPassword") ?? ""),
        password: String(formData.get("password") ?? ""),
        rePassword: String(formData.get("rePassword") ?? ""),
      });
      setMessage("Password updated successfully.");
      event.currentTarget.reset();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to update password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto my-20 w-11/12 max-w-xl rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
      <p className="mb-3 text-sm uppercase tracking-[0.2em] text-exclusive-secondary">Security</p>
      <h1 className="mb-8 font-inter text-3xl font-semibold">Change password</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="password"
          name="currentPassword"
          placeholder="Current password"
          className="w-full rounded border border-black/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-exclusive-secondary/30"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="New password"
          className="w-full rounded border border-black/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-exclusive-secondary/30"
          required
        />
        <input
          type="password"
          name="rePassword"
          placeholder="Confirm new password"
          className="w-full rounded border border-black/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-exclusive-secondary/30"
          required
        />

        {message ? <p className="text-sm text-green-600">{message}</p> : null}
        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <button className="rounded bg-exclusive-secondary px-6 py-3 text-white">
          {isSubmitting ? "Updating..." : "Update password"}
        </button>
      </form>
    </section>
  );
}
