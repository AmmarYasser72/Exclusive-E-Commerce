"use client";

import { useContext, useMemo } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

import { CartAndWishlistContext } from "@/app/context/CartAndWishlistContextProvider";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
  price: number | string;
  quantity?: number;
  defaultPriceId?: string;
}

const fmtUSD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function CartTableItem({ id, name, imageUrl, price }: ItemProps) {
  const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart } =
    useContext(CartAndWishlistContext);

  const qty = getItemQuantity(id);
  const unit = useMemo(() => Number(price) || 0, [price]);
  const subtotal = unit * qty;
  const img = imageUrl || "/placeholder.png";

  return (
    <tr className="border flex mb-10 items-center gap-6 pl-4 md:gap-0 md:pl-0">
      <td className="relative py-6 pl-4 w-full flex flex-col gap-2 items-start md:pl-10 xl:flex-row xl:gap-5 xl:items-center">
        <Image src={img} width={54} height={54} alt={name} className="object-contain" />
        <button
          className="absolute left-2 top-4 md:left-8"
          aria-label="Remove from cart"
          title="Remove from cart"
          onClick={() => removeFromCart(id)}
        >
          <IoClose size={20} className="text-exclusive-text-1 bg-exclusive-secondary rounded-full" />
        </button>
        <Link href={`/products/${id}`} className="line-clamp-5 hover:underline">
          {name}
        </Link>
      </td>

      <td className="py-6 w-full">{fmtUSD.format(unit)}</td>

      <td className="py-6 w-full">
        <div className="pt-2 px-3 pb-1 border-2 border-black/25 rounded w-fit select-none">
          <span>{qty < 10 ? `0${qty}` : qty}</span>
          <div className={`flex flex-col ml-6 ${qty < 10 ? "-mt-5 2xl:-mt-7" : "-mt-5 lg:-mt-7"}`}>
            <button aria-label="Increase quantity" onClick={() => increaseItemQuantity(id)}>
              <MdKeyboardArrowUp />
            </button>
            <button aria-label="Decrease quantity" onClick={() => decreaseItemQuantity(id)}>
              <MdKeyboardArrowDown />
            </button>
          </div>
        </div>
      </td>

      <td className="w-full py-6 pr-16 text-right">{fmtUSD.format(subtotal)}</td>
    </tr>
  );
}
