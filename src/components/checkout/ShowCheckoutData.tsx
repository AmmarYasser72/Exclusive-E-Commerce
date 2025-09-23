"use client";

import { CartAndWishlistContext } from "@/src/app/context/CartAndWishlistContextProvider";
import { useContext } from "react";
import { ItemOnCheckout } from "./ItemOnCheckout";

export function ShowCheckoutData() {
  const { cartItems } = useContext(CartAndWishlistContext)

  const getTotalPrice = () => {
    return (
      cartItems.reduce((total, cartItem) => {
        const item = cartItems.find(item => item.name === cartItem.name)
        return total + ((item?.price) || 0) * cartItem.quantity!
      }, 0)
    )
  }

  return (
    <div className="xl:w-full">
      {cartItems.map(item => {
        return (
          <ItemOnCheckout key={item.id} id={item.id} name={item.name!} imageUrl={item.imageURL!} price={item.price!} defaultPriceId={item.defaultPriceId!} />
        )
      })}
      <div className="flex justify-between border-b border-black/50 pb-4">
        <span>Subtotal:</span>
        <span>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(getTotalPrice())}
        </span>
      </div>
      <div className="flex justify-between border-b border-black/50 pb-4 mt-4">
        <span>Shipping:</span>
        <span>Free</span>
      </div>
      <div className="flex justify-between pb-4 mt-4">
        <span>Total:</span>
        <span>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(getTotalPrice())}
        </span>
      </div>
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <input type="text" name="" id="" className="border border-black px-6 py-4 h-fit rounded lg:w-[50%] 2xl:w-72" placeholder="Coupon Code" />
        {cartItems.length < 1
          ? <button className="bg-exclusive-secondary h-fit text-exclusive-text-1 py-4 px-12 text-sm font-medium mb-16 rounded md:text-base lg:w-[50%] 2xl:w-60 opacity-50 cursor-not-allowed">Apply Coupon</button>
          : <button className="bg-exclusive-secondary hover:bg-exclusive-secondary-hover h-fit duration-200 text-exclusive-text-1 py-4 px-12 text-sm font-medium mb-16 rounded md:text-base lg:w-[50%] 2xl:w-60">Apply Coupon</button>
        }

      </div>
      {cartItems.length < 1
        ? <button className="bg-exclusive-secondary h-fit text-exclusive-text-1 py-4 px-12 text-sm font-medium mb-16 rounded md:text-base opacity-50 cursor-not-allowed">Proceed to Payment</button>
        : <button
          type="submit"
          form="checkoutForm"
          className="bg-exclusive-secondary hover:bg-exclusive-secondary-hover h-fit duration-200 text-exclusive-text-1 py-4 px-12 text-sm font-medium mb-16 rounded md:text-base disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-exclusive-secondary"
        >
          Proceed to Payment
        </button>
      }
    </div>
  )
}