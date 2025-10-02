"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

import { FiEye } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";
import { ProductRating } from "../product/ProductRating";

// ✅ correct alias (your @ points to /src)
import { CartAndWishlistContext } from "@/app/context/CartAndWishlistContextProvider";

export interface WishListProductCardProps {
  justForYou: boolean;
  id: string;
  name: string;
  imageUrl: string; // keep as string for this card
  price: number;
  defaultPriceId?: string | null;
}

export function WishListProductCard({
  id,
  name,
  imageUrl,
  defaultPriceId,
  price,
  justForYou,
}: WishListProductCardProps) {
  const [discount] = useState(true);
  const [discountAmount] = useState(20);
  const [quantity] = useState(1);

  const { handleAddItemOnCart, removeFromWishlist } = useContext(CartAndWishlistContext);

  const displayImg = imageUrl || "/placeholder.png";
  const priceWithoutDiscount = discount ? +(price + (price * discountAmount) / 100).toFixed(2) : price;

  const addToCart = () => {
    // Some backends don’t need defaultPriceId; pass undefined safely
    handleAddItemOnCart(id, name, displayImg, price, defaultPriceId ?? undefined, quantity);
  };

  return (
    <div>
      {/* badges + actions */}
      <div className="flex justify-between h-[250px] -mb-[250px]">
        <div className="mt-2 ml-2 md:mt-3 md:ml-3">
          {discount && (
            <span className="bg-exclusive-secondary text-exclusive-text-1 text-xs py-1 px-3 rounded">
              -{discountAmount}%
            </span>
          )}
          {/* If you really need “NEW”, add your own flag/logic */}
        </div>

        <div className="flex flex-col h-fit gap-2 mt-2 mr-2 md:mt-3 md:mr-3">
          {justForYou ? (
            <Link
              href={`/products/${id}`}
              className="bg-exclusive-background p-2 h-auto w-9 rounded-full"
              aria-label="View product"
              title="View product"
            >
              <FiEye size={20} />
            </Link>
          ) : (
            <button
              className="bg-exclusive-background p-2 h-auto w-9 rounded-full"
              aria-label="Remove from wishlist"
              title="Remove from wishlist"
              onClick={() => removeFromWishlist(id)}
            >
              <BsTrash3 size={20} />
            </button>
          )}
        </div>
      </div>

      {/* image + hover add-to-cart */}
      <div className="bg-[#ecebeb] flex flex-col items-center mb-4 rounded pt-[3.775rem] h-[19rem] group focus:outline-none">
        <Link
          href={`/products/${id}`}
          className="h-[82%] mx-auto flex items-center justify-center focus:outline-none focus:border-none"
        >
          <Image
            src={displayImg}
            alt={name}
            width={220}
            height={190}
            className="w-[220px] max-h-[190px] px-4 my-auto lg:w-[230px] 2xl:w-[240px] object-contain"
          />
        </Link>

        <footer className="w-full overflow-hidden">
          <button
            className="w-full text-exclusive-text-1 bg-black flex justify-center cursor-pointer rounded-b py-1 font-medium transform translate-y-[110%] opacity-0 group-hover:translate-y-[0%] group-hover:opacity-100 transition-all ease-in-out duration-200 mt-1 md:py-2"
            onClick={addToCart}
          >
            Add To Cart
          </button>
        </footer>
      </div>

      {/* text + price */}
      <div className="flex flex-col gap-2">
        <div className="flex">
          <Link href={`/products/${id}`} className="font-medium line-clamp-4">
            {name}
          </Link>
        </div>

        {discount ? (
          <div className="flex gap-3">
            <span className="text-exclusive-secondary">${price.toFixed(2)}</span>
            <span className="opacity-60 line-through">${priceWithoutDiscount.toFixed(2)}</span>
          </div>
        ) : (
          <span className="text-exclusive-secondary">${price.toFixed(2)}</span>
        )}

        <ProductRating />
      </div>
    </div>
  );
}
