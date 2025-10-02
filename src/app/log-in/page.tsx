import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col lg:mt-16 lg:mb-16 lg:flex-row">
      <div className="mb-16 lg:mb-0 lg:w-[50%] xl:flex-1 2xl:flex-none">
        <Image
          src="/signup-login/shop-blue-background.svg" // from /public
          alt="Blue shopping illustration"
          width={400}
          height={500}
          priority
          className="h-auto w-full"
        />
      </div>

      <form className="flex flex-col items-center mb-16 mx-6 md:mx-20 lg:items-start lg:justify-center 2xl:mx-auto w-full max-w-md">
        <h2 className="font-inter font-medium text-4xl mb-2 text-center lg:text-left">
          Log in to Exclusive
        </h2>
        <p className="mb-10 text-center lg:text-left">Enter your details below</p>

        <label htmlFor="emailOrPhone" className="sr-only">Email or Phone Number</label>
        <input
          id="emailOrPhone"
          name="emailOrPhone"
          type="text"
          placeholder="Email or Phone Number"
          autoComplete="username"
          className="bg-transparent border-b border-[#a5a5a5] w-full mb-8 py-2 focus:outline-none"
          required
        />

        <label htmlFor="password" className="sr-only">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          className="bg-transparent border-b border-[#a5a5a5] w-full mb-8 py-2 focus:outline-none"
          required
        />

        <div className="flex w-full items-center justify-between gap-4">
          <button
            type="submit"
            className="bg-exclusive-secondary hover:bg-exclusive-secondary-hover duration-200 rounded text-exclusive-text-1 py-3 px-8"
          >
            Log in
          </button>
          <Link href="/forgot-password" className="text-exclusive-secondary">
            Forgot password?
          </Link>
        </div>

        <div className="mt-8 text-sm opacity-80">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="underline underline-offset-4">
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
}
