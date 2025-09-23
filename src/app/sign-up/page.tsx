import shop_blue_background from "@/public/signup-login/shop-blue-background.svg"
import { FcGoogle } from 'react-icons/fc'

import Image from "next/image"
import Link from "next/link"

export default function page() {
  return (
    <div className="flex flex-col lg:mt-16 lg:mb-16 lg:flex-row">
      <div className="mb-16 lg:mb-0 lg:w-[50%] xl:flex-1 2xl:flex-none">
        <Image src={shop_blue_background} width={1000} height={800} alt="" quality={100} />
      </div>
      <form className="flex flex-col items-center mb-16 mx-7 md:mx-20 lg:items-start lg:justify-center 2xl:mx-auto">
        <h2 className="font-inter font-medium text-4xl mb-6">Create an account</h2>
        <span className="mb-12">Enter your details below</span>
        <input
          type="text"
          name=""
          id="name"
          placeholder="Name"
          className="bg-transparent border-b border-[#a5a5a5] w-full mb-10 py-1 focus:outline-none"
          required
        />
        <input
          type="text"
          name=""
          id="emailOrPhone"
          placeholder="Email or Phone Number"
          className="bg-transparent border-b border-[#a5a5a5] w-full mb-10 py-1 focus:outline-none"
          required
        />
        <input
          type="password"
          name=""
          id="password"
          placeholder="Password"
          className="bg-transparent border-b border-[#a5a5a5] w-full mb-10 py-1 focus:outline-none"
          required />
        <button className="mb-4 bg-exclusive-secondary hover:bg-exclusive-secondary-hover duration-200 w-full rounded text-exclusive-text-1 py-4">Create Account</button>
        <button type="submit" className="mb-8 flex gap-4 border border-[#a5a5a5] w-full rounded justify-center items-center">
          <FcGoogle size={28} />
          <span className="py-4">Sign up with Google</span>
        </button>
        <div className="flex gap-4 mx-auto">
          <span className="opacity-70">Already have account?</span>
          <Link href="/log-in" className="underline underline-offset-8">Log in</Link>
        </div>
      </form>
    </div>
  )
}