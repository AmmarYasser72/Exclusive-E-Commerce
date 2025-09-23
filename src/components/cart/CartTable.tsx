"use client";

import { CartAndWishlistContext } from "@/src/app/context/CartAndWishlistContextProvider";
import { CartTableItem } from "./CartTableItem";
import { useContext } from 'react'
import Link from "next/link";

export function CartTable() {
  const { cartItems } = useContext(CartAndWishlistContext)

  return (
    <>
      <table className="w-5/6 mx-auto text-xs 2xl:text-base">
        <tbody>
          <tr className="border flex justify-between mb-10 items-center gap-8 md:justify-normal">
            <td className="py-6 w-full pl-7 md:pl-10">
              Product
            </td>
            <td className="py-6 w-full px-5 md:px-0">
              Price
            </td>
            <td className="py-6 w-full md:pr-6 2xl:pr-10 ">
              Quantity
            </td>
            <td className="w-full py-6 pr-16 text-right">
              Subtotal
            </td>
          </tr>
          {cartItems.map(item => {
            return (
              <CartTableItem key={item.id} id={item.id} name={item.name!} imageUrl={item.imageURL!} price={item.price!} defaultPriceId={item.defaultPriceId!} quantity={item.quantity} />
            )
          })}
        </tbody>
      </table>
      <div className="flex justify-between w-5/6 mx-auto mb-20">
        <Link href="#" className="font-medium text-sm py-4 px-6 border border-black/40 rounded md:px-12 lg:text-base">Return To Shop</Link>
        <button className="font-medium text-sm py-4 px-6 border border-black/40 rounded md:px-12 lg:text-base" onClick={() => location.reload()}>Update Cart</button>
      </div>
    </>
  )
}