import Image from "next/image";
import Link from "next/link";

import { RiFacebookLine, RiTwitterLine, RiInstagramLine, RiLinkedinLine, RiCopyrightLine, RiSendPlane2Line } from "react-icons/ri";

export function Footer() {
  return (
    <footer className="bg-black text-exclusive-text-1">
      <section className="flex flex-row flex-wrap justify-center py-10 px-10 gap-x-10 md:mx-auto lg:w-5/6 lg:justify-between lg:pb-14 lg:pt-16 lg:p-0">
        <div className="flex flex-col mb-6 lg:mb-0">
          <Link href="/" aria-label="Exclusive home">
            <Image
              src="/footer/logo-footer.svg"
              width={140}
              height={36}
              alt="Exclusive"
              className="mb-6 h-auto w-auto"
              priority
            />
          </Link>
          <h3 className="flex flex-col mb-6 font-medium text-xl">Subscribe</h3>
          <span className="font-extralight mb-4">Get 10% off your first order</span>
          <div className="flex items-center">
            <input
              placeholder="Enter your email"
              className="py-3 pl-4 pr-10 w-4/5 rounded-[0.250rem] bg-transparent border placeholder:opacity-70"
            />
            <button aria-label="Subscribe">
              <RiSendPlane2Line size={25} className="-ml-10" />
            </button>
          </div>
        </div>

        <div className="flex flex-col mb-6 lg:mb-0">
          <h3 className="mb-6 font-medium text-xl">Support</h3>
          <span className="mb-4 text-center">Alexandria<br />Egypt</span>
          <span className="mb-4">ay109543@gmail.com</span>
          <span className="mb-4">01000463804</span>
        </div>

        <div className="flex flex-col mb-6 lg:mb-0">
          <h3 className="mb-6 font-medium text-xl">Account</h3>
          <Link href="/account" className="mb-4">My Account</Link>
          <Link href="/log-in" className="mb-4">Login / Register</Link>
          <Link href="/cart" className="mb-4">Cart</Link>
          <Link href="/wishlist" className="mb-4">Wishlist</Link>
          <Link href="/products" className="mb-4">Shop</Link>
        </div>

        <div className="flex flex-col mb-6 lg:mb-0">
          <h3 className="mb-6 font-medium text-xl">Quick Link</h3>
          <Link href="/privacy" className="mb-4">Privacy Policy</Link>
          <Link href="/terms" className="mb-4">Terms Of Use</Link>
          <Link href="/faq" className="mb-4">FAQ</Link>
          <Link href="/contact" className="mb-4">Contact</Link>
        </div>

        <div className="flex flex-col lg:mb-0">
          <h3 className="mb-6 font-medium text-xl">Download App</h3>
          <div className="ml-1">
            <span className="text-xs opacity-70">Save $3 with App New User Only</span>
          </div>
          <div>
            <div className="flex items-start gap-4 mb-6">
              <Image
                src="/footer/Qrcode.svg"
                width={80}
                height={48}
                alt="QR code"
                className="mt-1 shrink-0"
              />
              <div className="flex flex-col items-center">
                <Link href="#">
                  <Image
                    src="/footer/google-play-badge.png"
                    width={135}
                    height={40}
                    alt="Get it on Google Play"
                    className="w-32 h-auto"
                  />
                </Link>
                <Link href="#">
                  <Image
                    src="/footer/app-store-badge.svg"
                    width={120}
                    height={40}
                    alt="Download on the App Store"
                    className="w-28 h-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-6">
            <Link href="#"><RiFacebookLine size={24} /></Link>
            <Link href="#"><RiTwitterLine size={24} /></Link>
            <Link href="#"><RiInstagramLine size={24} /></Link>
            <Link href="#"><RiLinkedinLine size={24} /></Link>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-center pb-6 opacity-30 gap-[0.375rem] border-t-2 border-white border-opacity-25">
        <span className="mt-4"><RiCopyrightLine size={22} /></span>
        <span className="font-light mt-4">Copyright Ammar Yasser. All rights reserved</span>
      </div>
    </footer>
  );
}
