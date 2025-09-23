'use client';

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "./RelatedItemsSlider.css";
import { ProductCard } from "../ProductCard";
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

export function RelatedItemsSlider({ products }: ProductsProps) {
  return (
    <div>
      <Slider {...settings}>
        {products.map(product => {
          return (
            <div key={product.id}>
              <ProductCard {...product} />
            </div>
          )
        })}
      </Slider>
    </div>
  )
}