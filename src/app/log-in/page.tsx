import shop_blue_background from "@/public/signup-login/shop-blue-background.svg"
import Image from "next/image"
import Link from "next/link"

export default function page() {
  return (
    <div className="flex flex-col lg:mt-16 lg:mb-16 lg:flex-row">
      <div className="mb-16 lg:mb-0 lg:w-[50%] xl:flex-1 2xl:flex-none">
        <Image src={shop_blue_background} width={1000} height={800} alt="" quality={100} />
      </div>
      <form className="flex flex-col items-center mb-16 mx-6 md:mx-20 lg:items-start lg:justify-center 2xl:mx-auto">
        <h2 className="font-inter font-medium text-4xl mb-6">Log in to Exclusive</h2>
        <span className="mb-12">Enter your details below</span>
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
        <div className="flex w-full justify-between items-center">
          <button type="submit" className="bg-exclusive-secondary hover:bg-exclusive-secondary-hover duration-200 rounded text-exclusive-text-1 py-4 px-12">Log in</button>
          <Link href="#" className="text-exclusive-secondary">Forget Password?</Link>
        </div>
      </form>
    </div>
  )
}