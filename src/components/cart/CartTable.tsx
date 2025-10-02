"use client";

import { useContext } from "react";
import Link from "next/link";

import { CartAndWishlistContext } from "@/app/context/CartAndWishlistContextProvider";
import { CartTableItem } from "./CartTableItem";

export function CartTable() {
  const { cartItems = [] } = useContext(CartAndWishlistContext);

  const rows = cartItems.map((it: any) => ({
    id: String(it.id ?? it._id ?? crypto.randomUUID()),
    name: String(it.name ?? it.title ?? "Unnamed product"),
    imageUrl: String(it.imageUrl ?? it.imageURL ?? "/placeholder.png"),
    price: Number(it.price ?? 0),
    defaultPriceId: it.defaultPriceId ?? undefined,
    quantity: Number(it.quantity ?? it.count ?? 1),
  }));

  return (
    <>
      <table className="w-5/6 mx-auto text-xs 2xl:text-base">
        <thead>
          <tr className="border">
            <th className="py-6 w-1/2 pl-7 md:pl-10 text-left">Product</th>
            <th className="py-6 w-1/6 px-5 md:px-0 text-left">Price</th>
            <th className="py-6 w-1/6 md:pr-6 2xl:pr-10 text-left">Quantity</th>
            <th className="py-6 w-1/6 pr-6 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((p) => (
              <CartTableItem
                key={p.id}
                id={p.id}
                name={p.name}
                imageUrl={p.imageUrl}
                price={p.price}
                defaultPriceId={p.defaultPriceId}
                quantity={p.quantity}
              />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-10 text-center text-sm">
                Your cart is empty.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between w-5/6 mx-auto mb-20">
        <Link
          href="/products"
          className="font-medium text-sm py-4 px-6 border border-black/40 rounded md:px-12 lg:text-base"
        >
          Return To Shop
        </Link>
        <button
          className="font-medium text-sm py-4 px-6 border border-black/40 rounded md:px-12 lg:text-base"
          onClick={() =>
            typeof window !== "undefined" ? window.location.reload() : null
          }
        >
          Update Cart
        </button>
      </div>
    </>
  );
}
