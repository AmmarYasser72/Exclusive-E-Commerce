"use client";

import { useContext } from "react";
import { CartAndWishlistContext } from "@/app/context/CartAndWishlistContextProvider";
import { WishListProductCard } from "./WishListProductCard";

export function WishlistProducts() {
  const ctx = useContext(CartAndWishlistContext);

  const wishlistItems = ctx?.wishlistItems ?? [];
  const moveAll = ctx?.handleMoveItemsFromWishlistToCart;

  return (
    <>
      <header className="flex justify-between mt-20 mb-16 items-center">
        <span className="text-xl">Wishlist ({wishlistItems.length})</span>

        <button
          className={`font-medium py-4 border border-black/40 rounded px-6 md:px-12 ${
            wishlistItems.length ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => wishlistItems.length && moveAll?.()}
          disabled={!wishlistItems.length}
        >
          Move All To Cart
        </button>
      </header>

      <div>
        {wishlistItems.length ? (
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-8 2xl:grid-cols-4 3xl:grid-cols-5">
            {wishlistItems.map((item) => (
              <li className="w-full" key={item.id ?? item.defaultPriceId ?? item.name}>
                <WishListProductCard
                  justForYou={false}
                  id={String(item.id)}
                  name={String(item.name)}
                  imageUrl={(item as any).imageURL || (item as any).imageUrl || ""}
                  price={Number(item.price) || 0}
                  defaultPriceId={item.defaultPriceId ?? undefined}
                />
              </li>
            ))}
          </ul>
        ) : (
          <span className="cursor-default text-lg flex justify-center">
            Your wishlist items will be shown here
          </span>
        )}
      </div>
    </>
  );
}
