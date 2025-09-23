'use client';

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "./JustForYouSlider.css";

import { WishListProductCard } from "../WishListProductCard";
import { ProductsProps } from "@/src/app/page";

const settings: Settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 550,
  slidesToShow: 5,
  swipeToSlide: true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 2000,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
      },
    },
  ]
};

export function JustForYouSlider({ products }: ProductsProps) {
  return (
    <div>
      <Slider {...settings}>
        {products.map(product => {
          return (
            <WishListProductCard key={product.id} justForYou={true} id={product.id} name={product.name} imageUrl={product.imageUrl?.[0]} price={product.price} />
          )
        })}
      </Slider>
    </div>
  )
}