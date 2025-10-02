import Link from "next/link";
import { Metadata } from "next";

import { CartTable } from "@/components/cart/CartTable";
import { ShowCartData } from "@/components/cart/ShowCartData";

export const metadata: Metadata = {
  title: "Cart",
};

export default function Page() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex gap-3 mt-10 mb-10 text-sm w-5/6 mx-auto lg:mt-20 lg:mb-20">
        <Link href="/" className="opacity-50">
          Home
        </Link>
        <span className="opacity-50">/</span>
        <span className="font-medium cursor-default">Cart</span>
      </div>

      {/* Cart table */}
      <CartTable />

      {/* Summary / actions */}
      <div className="flex flex-col w-5/6 mx-auto lg:flex-row lg:justify-between">
        <ShowCartData />
      </div>
    </div>
  );
}
