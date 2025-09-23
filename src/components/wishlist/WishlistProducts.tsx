"use client";

import { CartAndWishlistContext } from "@/src/app/context/CartAndWishlistContextProvider"
import { useContext } from "react"
import { WishListProductCard } from "./WishListProductCard"

export function WishlistProducts() {
  const { wishlistItems, handleMoveItemsFromWishlistToCart } = useContext(CartAndWishlistContext)

  return (
    <>
      <header className="flex justify-between mt-20 mb-16 items-center">
        <span className="text-xl">Wishlist ({wishlistItems.length})</span>
        {wishlistItems.length > 0
          ?
          <button
            className="font-medium py-4 border border-black/40 rounded px-6 md:px-12"
            onClick={() => handleMoveItemsFromWishlistToCart()}
          >
            Move All To Cart
          </button>
          : <button className="font-medium py-4 border border-black/40 rounded px-6 md:px-12 opacity-50 cursor-not-allowed">Move All To Cart</button>}
      </header>
      <div>
        {wishlistItems.length > 0
          ? <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-8 2xl:grid-cols-4 3xl:grid-cols-5">
            {wishlistItems.map(item => {
              return (
                <li className="w-full" key={item.id}>
                  <WishListProductCard justForYou={false} id={item.id} name={item.name} imageUrl={item.imageURL} price={item.price} defaultPriceId={item.defaultPriceId!} />
                </li>
              )
            })}
          </ul>
          : <span className="cursor-default text-lg flex justify-center">Your wishlist items will be showed here</span>
        }
      </div>
    </>
  )
}