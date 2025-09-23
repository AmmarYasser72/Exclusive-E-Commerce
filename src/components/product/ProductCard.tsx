"use client"

import Image from "next/image";
import { useContext, useState } from 'react'

import { FiEye } from 'react-icons/fi'
import { VscHeart } from 'react-icons/vsc'

import Link from "next/link";
import { ProductRating } from "./ProductRating";
import { CartAndWishlistContext } from "@/src/app/context/CartAndWishlistContextProvider";

export interface ProductCardProps {
  id: string;
  name: string;
  imageUrl: string | string[];
  price: number;
  defaultPriceId: string;
}

export function ProductCard({ id, name, imageUrl, defaultPriceId, price }: ProductCardProps) {
  const [discount, setDiscount] = useState(true)
  const [discountAmount, setDiscountAmout] = useState(20)
  const [newProduct, setNewProduct] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { handleAddItemOnCart, handleAddItemOnWishlist, removeFromWishlist, verifyItemOnWishlist } = useContext(CartAndWishlistContext)

  function priceWithoutDiscount() {
    if (discount) {
      return price + (price * discountAmount / 100)
    }
  }

  return (
    <div>
      <div className="flex justify-between h-[250px] -mb-[250px]">
        <div className="mt-2 ml-2 md:mt-3 md:ml-3">
          {discount
            ? <span className="bg-exclusive-secondary text-exclusive-text-1 text-xs py-1 px-3 rounded">-{discountAmount}%</span>
            : null}
          {newProduct
            ? <span className="bg-exclusive-primary-1 text-exclusive-text-2 text-xs py-1 px-3 ml-2 rounded">NEW</span>
            : null}
        </div>
        <div className="flex flex-col h-fit gap-2 mt-2 mr-2 md:mt-3 md:mr-3">
          {verifyItemOnWishlist(id)
            ?
            <button
              className="bg-red-500 p-2 h-auto w-9 rounded-full "
              aria-label="add to wishlist"
              title="add to wishlist"
              onClick={() => removeFromWishlist(id)}
            >
              <VscHeart size={20} />
            </button>
            :
            <button
              className="bg-exclusive-background p-2 h-auto w-9 rounded-full "
              aria-label="add to wishlist"
              title="add to wishlist"
              onClick={() => handleAddItemOnWishlist(id, name, imageUrl?.[0], defaultPriceId, price)}
            >
              <VscHeart size={20} />
            </button>
          }
          <button className="bg-exclusive-background p-2 h-auto w-9 rounded-full hover:cursor-not-allowed" >
            <FiEye size={20} />
          </button>
        </div>
      </div>
      <div className="bg-[#ecebeb] flex flex-col items-center mb-4 rounded pt-[3.775rem] h-[20rem] group focus:outline-none ">
        <Link href={`/products/${id}`} className="h-[82%] mx-auto flex items-center justify-center focus:outline-none focus:border-none" >
          <Image
            src={imageUrl?.[0]}
            alt={name}
            width={130}
            height={190}
            quality={100}
            className="focus:outline-none focus:border-none w-[220px] max-h-[190px] px-4 my-auto lg:w-[230px] 2xl:w-[240px] ">
          </Image>
        </Link>
        <footer className="w-full overflow-hidden">
          <button
            className="w-full text-exclusive-text-1 bg-black flex justify-center cursor-pointer rounded-b py-1 font-medium transform translate-y-[110%] opacity-0 group-hover:translate-y-[0%] group-hover:opacity-100 transition-all ease-in-out duration-200 mt-4 md:py-2 md:mt-2 "
            onClick={() => handleAddItemOnCart(id, name, imageUrl?.[0], price, defaultPriceId, quantity)}
          >
            Add To Cart
          </button>
        </footer>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex">
          <Link href="#" className="font-medium line-clamp-4">{name}</Link>
        </div>
        {discount
          ? <div className="flex gap-3">
            <span className="text-exclusive-secondary">${price}</span>
            <span className="opacity-60 line-through">${priceWithoutDiscount()}</span>
          </div>
          : <span className="text-exclusive-secondary">${price}</span>
        }
        <ProductRating />
      </div>
    </div>
  )
}