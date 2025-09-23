"use client";

import { useContext } from 'react'

import Link from 'next/link'
import { CartAndWishlistContext } from '@/src/app/context/CartAndWishlistContextProvider';

export function ShowCartData() {
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
    <>
      <div className="flex flex-col gap-4 xl:justify-between xl:flex-row">
        <input type="text" name="" id="" className="border border-black px-6 py-4 lg:w-72 h-fit rounded" placeholder="Coupon Code" />
        {cartItems.length < 1
          ? <button className="bg-exclusive-secondary h-fit text-exclusive-text-1 py-4 px-12 text-sm font-medium mb-16 rounded md:text-base opacity-50 cursor-not-allowed ">Apply Coupon</button>
          : <button className="bg-exclusive-secondary hover:bg-exclusive-secondary-hover h-fit duration-200 text-exclusive-text-1 py-4 px-12 text-sm font-medium mb-16 rounded md:text-base ">Apply Coupon</button>
        }

      </div>
      <div className="border-2 border-black rounded px-6 py-8 mb-36 w-full lg:w-[370px] xl:w-[470px]">
        <h2 className="font-medium text-xl mb-6">Cart Total</h2>
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
        <div className="flex w-max mx-auto">
          {cartItems.length < 1
            ? <span className="bg-exclusive-secondary h-fit text-exclusive-text-1 py-4 px-12 text-sm font-medium rounded md:text-base opacity-50 cursor-not-allowed">Proceed to checkout</span>
            : <Link href="/cart/checkout" className="bg-exclusive-secondary hover:bg-exclusive-secondary-hover h-fit duration-200 text-exclusive-text-1 py-4 px-12 text-sm font-medium rounded md:text-base">Proceed to checkout</Link>
          }
        </div>
      </div>
    </>
  )
}