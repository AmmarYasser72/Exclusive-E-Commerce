"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

import { Search } from "./Search";
import { WishlistAndCart } from "./header/WishlistAndCart";
import { AuthContext } from "@/app/context/AuthContextProvider";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/brands", label: "Brands" },
  { href: "/orders", label: "Orders" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export function Header() {
  const { isAuthenticated, signOut } = useContext(AuthContext);

  return (
    <header className="flex flex-col border-b border-black/10">
      <section className="bg-black px-3 py-3 text-center text-sm text-white">
        <span className="pr-2">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </span>
        <Link href="/products" className="font-semibold underline underline-offset-2">
          Shop Now
        </Link>
      </section>

      <section className="mx-auto flex w-11/12 flex-col gap-6 py-8 lg:w-5/6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <Link href="/" aria-label="Exclusive home" className="flex justify-center lg:justify-start">
            <Image
              src="/header/logo-header.svg"
              width={140}
              height={20}
              alt="Exclusive"
              priority
              className="h-auto w-auto"
            />
          </Link>

          <nav>
            <ul className="flex flex-wrap items-center justify-center gap-3 text-sm lg:justify-start lg:text-base xl:gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline underline-offset-[5px] decoration-black/50">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <div className="flex justify-center lg:justify-start">
            <Search />
          </div>

          <div className="flex items-center justify-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/change-password" className="text-sm hover:underline">
                  Change Password
                </Link>
                <button type="button" onClick={signOut} className="text-sm hover:underline">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/log-in" className="text-sm hover:underline">
                  Login
                </Link>
                <Link href="/sign-up" className="text-sm hover:underline">
                  Sign Up
                </Link>
              </>
            )}

            <WishlistAndCart />
          </div>
        </div>
      </section>
    </header>
  );
}
