"use client";

import { useContext, useMemo, useState } from "react";
import Link from "next/link";
import { CartAndWishlistContext } from "@/app/context/CartAndWishlistContextProvider";

export function ShowCartData() {
  const { cartItems = [] } = useContext(CartAndWishlistContext);
  const [coupon, setCoupon] = useState("");

  const fmtUSD = useMemo(
    () => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
    []
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce((sum, it: any) => {
        const price = Number(it?.price ?? 0);
        const qty = Number(it?.quantity ?? 1);
        return sum + price * qty;
      }, 0),
    [cartItems]
  );

  const shippingLabel = "Free";
  const total = subtotal; // add shipping/taxes here if needed

  const canCheckout = cartItems.length > 0;
  const canApply = canCheckout && coupon.trim().length > 0;

  return (
    <>
      <div className="flex flex-col gap-4 xl:justify-between xl:flex-row">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="border border-black px-6 py-4 lg:w-72 h-fit rounded"
          placeholder="Coupon Code"
          aria-label="Coupon code"
        />
        <button
          disabled={!canApply}
          className={`h-fit text-exclusive-text-1 py-4 px-12 text-sm font-medium mb-16 rounded md:text-base ${
            canApply
              ? "bg-exclusive-secondary hover:bg-exclusive-secondary-hover duration-200"
              : "bg-exclusive-secondary opacity-50 cursor-not-allowed"
          }`}
          onClick={() => {
            // hook your coupon API here
            // e.g., applyCoupon(coupon)
          }}
        >
          Apply Coupon
        </button>
      </div>

      <div className="border-2 border-black rounded px-6 py-8 mb-36 w-full lg:w-[370px] xl:w-[470px]">
        <h2 className="font-medium text-xl mb-6">Cart Total</h2>

        <div className="flex justify-between border-b border-black/50 pb-4">
          <span>Subtotal:</span>
          <span>{fmtUSD.format(subtotal)}</span>
        </div>

        <div className="flex justify-between border-b border-black/50 pb-4 mt-4">
          <span>Shipping:</span>
          <span>{shippingLabel}</span>
        </div>

        <div className="flex justify-between pb-4 mt-4">
          <span>Total:</span>
          <span>{fmtUSD.format(total)}</span>
        </div>

        <div className="flex w-max mx-auto">
          {canCheckout ? (
            <Link
              href="/cart/checkout"
              className="bg-exclusive-secondary hover:bg-exclusive-secondary-hover h-fit duration-200 text-exclusive-text-1 py-4 px-12 text-sm font-medium rounded md:text-base"
            >
              Proceed to checkout
            </Link>
          ) : (
            <span className="bg-exclusive-secondary h-fit text-exclusive-text-1 py-4 px-12 text-sm font-medium rounded md:text-base opacity-50 cursor-not-allowed">
              Proceed to checkout
            </span>
          )}
        </div>
      </div>
    </>
  );
}
