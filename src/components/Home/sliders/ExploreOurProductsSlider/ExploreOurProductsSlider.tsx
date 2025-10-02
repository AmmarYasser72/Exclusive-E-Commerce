'use client';

import Slider, { Settings } from "react-slick";
// @ts-ignore: allow importing global CSS without type declarations
import "slick-carousel/slick/slick.css";
// @ts-ignore: allow importing local CSS without type declarations
import "./ExploreOurProductsSlider.css";

import { useRef } from "react";
import { HiArrowRight } from 'react-icons/hi'
import { HiArrowLeft } from 'react-icons/hi'

import { ProductCard } from "../../../product/ProductCard";
type ProductsProps = {
  products: Array<Record<string, any> & { id: string | number }>;
};

const settings: Settings = {
  dots: false,
  arrows: false,
  infinite: false,
  swipeToSlide: true,
  speed: 550,
  slidesToShow: 5,
  rows: 2,
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
        slidesToShow: 2,
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

export function ExploreOurProductsSlider({ products }: ProductsProps) {
  const slider = useRef(null);

  return (
    <div>
      <div className="flex justify-end gap-2 mr-8 mb-[3.750rem] -mt-[2rem] md:-mt-[2.6rem]">
        {/* @ts-expect-error: slickPrev library type*/}
        <button type="button" onClick={() => slider?.current?.slickPrev()} title="Previous" aria-label="Previous slide"><HiArrowLeft size={23} className="bg-[#ecebeb] p-3 rounded-full w-9 h-9 md:w-12 md:h-12" /></button>
        {/* @ts-expect-error: slickNext library type */}
        <button type="button" onClick={() => slider?.current?.slickNext()} title="Next" aria-label="Next slide"><HiArrowRight size={23} className="bg-[#ecebeb] p-3 rounded-full w-9 h-9 md:w-12 md:h-12" /></button>
      </div>
      <Slider ref={slider} {...settings}>
        {products.map(product => {
          return (
            <div className="mb-[3.750rem] " key={product.id}>
              <ProductCard {...(product as any)} />
            </div>
          )
        })}

      </Slider>
    </div>

  )
}