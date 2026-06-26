import Image from "next/image";
import Link from "next/link";

import {
  RiCopyrightLine,
  RiFacebookLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiSendPlane2Line,
  RiTwitterLine,
} from "react-icons/ri";

export function Footer() {
  return (
    <footer className="bg-black text-exclusive-text-1">
      <section className="mx-auto grid w-11/12 gap-8 py-10 sm:grid-cols-2 lg:w-5/6 lg:grid-cols-[1fr_0.85fr_0.85fr_0.85fr_1fr] lg:gap-10 lg:py-12">
        <div className="flex flex-col">
          <Link href="/" aria-label="Exclusive home">
            <Image
              src="/footer/logo-footer.svg"
              width={126}
              height={28}
              alt="Exclusive"
              className="mb-5 h-auto w-auto"
              priority
            />
          </Link>
          <h3 className="mb-4 font-medium text-lg">Subscribe</h3>
          <span className="mb-4 text-sm font-extralight">Get 10% off your first order</span>
          <div className="relative w-full max-w-[200px]">
            <input
              placeholder="Enter your email"
              className="w-full rounded-[0.250rem] border border-white/50 bg-transparent py-2.5 pl-4 pr-10 text-sm placeholder:opacity-70"
            />
            <button aria-label="Subscribe" className="absolute right-3 top-1/2 -translate-y-1/2">
              <RiSendPlane2Line size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-5 font-medium text-lg">Support</h3>
          <span className="mb-3 text-sm leading-6">
            Alexandria
            <br />
            Egypt
          </span>
          <span className="mb-3 text-sm">ay109543@gmail.com</span>
          <span className="text-sm">01000463804</span>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-5 font-medium text-lg">Account</h3>
          <Link href="/orders" className="mb-3 text-sm">My Account</Link>
          <Link href="/log-in" className="mb-3 text-sm">Login / Register</Link>
          <Link href="/cart" className="mb-3 text-sm">Cart</Link>
          <Link href="/wishlist" className="mb-3 text-sm">Wishlist</Link>
          <Link href="/products" className="text-sm">Shop</Link>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-5 font-medium text-lg">Quick Link</h3>
          <Link href="/privacy" className="mb-3 text-sm">Privacy Policy</Link>
          <Link href="/terms" className="mb-3 text-sm">Terms Of Use</Link>
          <Link href="/faq" className="mb-3 text-sm">FAQ</Link>
          <Link href="/contact" className="text-sm">Contact</Link>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-4 font-medium text-lg">Download App</h3>
          <span className="mb-4 text-[11px] opacity-70">Save $3 with App New User Only</span>

          <div className="mb-4 flex items-start gap-3">
            <Image
              src="/footer/Qrcode.svg"
              width={90}
              height={90}
              alt="QR code"
              className="h-[90px] w-[90px] shrink-0 bg-white"
            />

            <div className="flex flex-col gap-2">
              <Link href="#">
                <Image
                  src="/footer/google-play-badge.png"
                  width={102}
                  height={31}
                  alt="Get it on Google Play"
                  className="h-auto w-[102px]"
                />
              </Link>
              <Link href="#">
                <Image
                  src="/footer/app-store-badge.svg"
                  width={102}
                  height={31}
                  alt="Download on the App Store"
                  className="h-auto w-[102px]"
                />
              </Link>
            </div>
          </div>

          <div className="flex gap-5">
            <Link href="#" aria-label="Facebook"><RiFacebookLine size={18} /></Link>
            <Link href="#" aria-label="Twitter"><RiTwitterLine size={18} /></Link>
            <Link href="#" aria-label="Instagram"><RiInstagramLine size={18} /></Link>
            <Link href="#" aria-label="LinkedIn"><RiLinkedinLine size={18} /></Link>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-center gap-[0.375rem] border-t border-white/15 py-4 opacity-30">
        <RiCopyrightLine size={16} />
        <span className="text-xs font-light">Copyright Ammar Yasser. All rights reserved</span>
      </div>
    </footer>
  );
}
