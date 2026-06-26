"use client";

import "slick-carousel/slick/slick.css";
import "./slick-theme.css";

import { useContext, useMemo, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { VscHeart } from "react-icons/vsc";
import { TbRefresh, TbTruckDelivery } from "react-icons/tb";

import { ProductRating } from "@/components/product/ProductRating";
import { CartAndWishlistContext } from "@/app/context/CartAndWishlistContextProvider";

interface ProductInfoProps {
  productInfo: {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string[];
    price: number;
    quantity: number;
    rating?: number;
    ratingCount?: number;
    brandName?: string;
    categoryName?: string;
    defaultPriceId?: string | null;
  };
}

export function ProductInfoCard({ productInfo }: ProductInfoProps) {
  const [nav1, setNav1] = useState<Slider | undefined>();
  const [nav2, setNav2] = useState<Slider | undefined>();
  const [quantity, setQuantity] = useState(1);
  const {
    handleBuyItem,
    handleAddItemOnWishlist,
    verifyItemOnWishlist,
    removeFromWishlist,
  } = useContext(CartAndWishlistContext);

  const images = useMemo(
    () => (productInfo.imageUrl.length ? productInfo.imageUrl : ["/placeholder.png"]),
    [productInfo.imageUrl]
  );
  const inStock = productInfo.quantity > 0;

  function increase() {
    setQuantity((current) => Math.min(current + 1, Math.max(productInfo.quantity, 1)));
  }

  function decrease() {
    setQuantity((current) => Math.max(current - 1, 1));
  }

  return (
    <section className="w-full px-4 mx-auto lg:w-5/6 lg:px-0">
      <div className="grid gap-10 mt-20 mb-24 xl:grid-cols-[120px_minmax(0,560px)_minmax(320px,1fr)] 2xl:gap-16">
        <Slider
          asNavFor={nav1}
          ref={(slider) => setNav2(slider as Slider)}
          slidesToShow={Math.min(images.length, 4)}
          vertical
          verticalSwiping
          swipeToSlide
          focusOnSelect
          infinite={false}
          arrows={false}
          dots={false}
          className="order-2 xl:order-1"
        >
          {images.map((image, index) => (
            <div key={`${image}-${index}`} className="px-2">
              <div className="flex h-28 items-center justify-center rounded bg-[#f5f5f5] p-4">
                <Image src={image} alt={`${productInfo.name} preview ${index + 1}`} width={96} height={96} className="h-20 w-auto object-contain" />
              </div>
            </div>
          ))}
        </Slider>

        <Slider
          asNavFor={nav2}
          ref={(slider) => setNav1(slider as Slider)}
          arrows={false}
          dots={false}
          className="order-1 xl:order-2"
        >
          {images.map((image, index) => (
            <div key={`${image}-${index}`}>
              <div className="flex min-h-[420px] items-center justify-center rounded bg-[#f5f5f5] p-8">
                <Image
                  src={image}
                  alt={`${productInfo.name} image ${index + 1}`}
                  width={520}
                  height={520}
                  className="h-auto max-h-[440px] w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </Slider>

        <div className="order-3 flex flex-col">
          <p className="mb-3 text-sm uppercase tracking-[0.18em] text-neutral-500">
            {productInfo.brandName ?? productInfo.categoryName ?? "exclusive"}
          </p>
          <h2 className="mb-3 font-inter text-3xl font-semibold">{productInfo.name}</h2>

          <div className="mb-4 flex items-center gap-3">
            <ProductRating value={productInfo.rating} count={productInfo.ratingCount} />
            <span className={inStock ? "text-green-600" : "text-red-500"}>
              {inStock ? "In stock" : "Out of stock"}
            </span>
          </div>

          <div className="mb-6 text-3xl font-semibold text-exclusive-secondary">
            ${productInfo.price}
          </div>

          <p className="mb-8 border-b border-black/15 pb-8 text-sm leading-7 text-neutral-700">
            {productInfo.description || "No detailed description is available for this product yet."}
          </p>

          <div className="mb-8 flex items-center gap-4">
            <div className="flex items-center rounded border border-black/25">
              <button type="button" className="px-3 py-3 hover:bg-exclusive-secondary hover:text-white" onClick={decrease}>
                <AiOutlineMinus size={22} />
              </button>
              <span className="w-14 border-x border-black/20 py-3 text-center">{quantity}</span>
              <button type="button" className="px-3 py-3 hover:bg-exclusive-secondary hover:text-white" onClick={increase}>
                <AiOutlinePlus size={22} />
              </button>
            </div>

            <button
              type="button"
              className="rounded bg-exclusive-secondary px-8 py-3 font-medium text-white transition hover:bg-exclusive-secondary-hover"
              onClick={() =>
                handleBuyItem(
                  productInfo.id,
                  productInfo.name,
                  images[0],
                  productInfo.price,
                  productInfo.defaultPriceId,
                  quantity
                )
              }
            >
              Buy now
            </button>

            {verifyItemOnWishlist(productInfo.id) ? (
              <button
                type="button"
                className="rounded border border-black/25 bg-exclusive-secondary p-3 text-white"
                onClick={() => removeFromWishlist(productInfo.id)}
              >
                <VscHeart size={22} />
              </button>
            ) : (
              <button
                type="button"
                className="rounded border border-black/25 p-3"
                onClick={() =>
                  handleAddItemOnWishlist(
                    productInfo.id,
                    productInfo.name,
                    images[0],
                    productInfo.defaultPriceId,
                    productInfo.price
                  )
                }
              >
                <VscHeart size={22} />
              </button>
            )}
          </div>

          <div className="overflow-hidden rounded border border-black/20">
            <div className="flex items-center gap-4 border-b border-black/20 p-5">
              <TbTruckDelivery size={36} />
              <div>
                <p className="font-medium">Free delivery</p>
                <p className="text-xs text-neutral-600">
                  Shipping estimates are shown at checkout for your city.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5">
              <TbRefresh size={36} />
              <div>
                <p className="font-medium">Easy returns</p>
                <p className="text-xs text-neutral-600">
                  Eligible products can be returned within 30 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
