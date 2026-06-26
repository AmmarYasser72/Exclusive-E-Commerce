"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";

import { AuthContext } from "@/app/context/AuthContextProvider";

export default function Page() {
  const router = useRouter();
  const { signUp } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      await signUp({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        password: String(formData.get("password") ?? ""),
        rePassword: String(formData.get("rePassword") ?? ""),
      });

      router.push("/");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to create your account right now."
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
          width={1000}
          height={800}
          alt="Shop illustration"
          priority
          className="h-auto w-full"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center mb-16 mx-7 md:mx-20 lg:items-start lg:justify-center 2xl:mx-auto w-full max-w-md"
      >
        <h2 className="font-inter text-4xl font-medium mb-6">Create an account</h2>
        <span className="mb-12">Start shopping with your Route API profile.</span>

        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          className="bg-transparent border-b border-[#a5a5a5] w-full mb-8 py-2 focus:outline-none"
          required
        />

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email Address"
          className="bg-transparent border-b border-[#a5a5a5] w-full mb-8 py-2 focus:outline-none"
          required
        />

        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone Number"
          className="bg-transparent border-b border-[#a5a5a5] w-full mb-8 py-2 focus:outline-none"
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="bg-transparent border-b border-[#a5a5a5] w-full mb-8 py-2 focus:outline-none"
          required
        />

        <input
          type="password"
          id="rePassword"
          name="rePassword"
          placeholder="Confirm Password"
          className="bg-transparent border-b border-[#a5a5a5] w-full mb-4 py-2 focus:outline-none"
          required
        />

        {error ? <p className="mb-5 text-sm text-red-500">{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mb-8 w-full rounded bg-exclusive-secondary py-4 text-white transition hover:bg-exclusive-secondary-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>

        <div className="flex gap-4 mx-auto">
          <span className="opacity-70">Already have an account?</span>
          <Link href="/log-in" className="underline underline-offset-8">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
