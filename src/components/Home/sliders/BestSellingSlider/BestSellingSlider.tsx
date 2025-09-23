'use client';

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "./BestSellingSlider.css";

import { ProductCard } from "@/src/components/product/ProductCard";
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
      breakpoint: 1200,
      settings: {
        slidesToShow: 2.4,
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
        slidesToShow: 1.4,
      },
    },
  ]
};

export function BestSellingSlider({ products }: ProductsProps) {
  return (
    <div>
      <Slider {...settings}>
        {products.map(product => {
          return (
            <div key={product.id} >
              <ProductCard {...product} />
            </div>
          )
        })}
      </Slider>
    </div>
  )
}