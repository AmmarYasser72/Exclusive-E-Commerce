"use client";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "./JustForYouSlider.css";

import { WishListProductCard } from "../WishListProductCard";

type UiProduct = {
  id: string;
  name: string;
  imageUrl: string[] | string;
  price: number;
  defaultPriceId?: string | null;
};

type Props = { products: UiProduct[] };

const settings: Settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 550,
  slidesToShow: 5,
  swipeToSlide: true,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 2000, settings: { slidesToShow: 4 } },
    { breakpoint: 1600, settings: { slidesToShow: 3 } },
    { breakpoint: 800,  settings: { slidesToShow: 2 } },
    { breakpoint: 500,  settings: { slidesToShow: 1 } },
  ],
};

export function JustForYouSlider({ products }: Props) {
  return (
    <div>
      <Slider {...settings}>
        {products.map((product) => {
          const firstImage =
            Array.isArray(product.imageUrl) ? product.imageUrl[0] : product.imageUrl || "";

          return (
            <WishListProductCard
              key={product.id}
              justForYou
              id={product.id}
              name={product.name}
              imageUrl={firstImage}
              price={Number(product.price) || 0}
              defaultPriceId={product.defaultPriceId ?? undefined}
            />
          );
        })}
      </Slider>
    </div>
  );
}
