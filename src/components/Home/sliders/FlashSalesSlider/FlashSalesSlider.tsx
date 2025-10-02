'use client';

import Slider, { Settings } from "react-slick";
// @ts-ignore: ignore missing type declarations for CSS side-effect import
import "slick-carousel/slick/slick.css";
// @ts-ignore: ignore missing type declarations for CSS side-effect import
import "./FlashSalesSlider.css";

import { useRef } from "react";
import { HiArrowRight } from 'react-icons/hi'
import { HiArrowLeft } from 'react-icons/hi'
import { ProductCard } from "../../../product/ProductCard";

interface ProductsProps {
  products: any[];
}

const settings: Settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 550,
  slidesToShow: 5.5,
  swipeToSlide: true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 2500,
      settings: {
        slidesToShow: 4.4,
      },
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3.3,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2.5,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2.4,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1.5,
      },
    },
  ]
};

export function FlashSalesSlider({ products }: ProductsProps) {
  const slider = useRef(null);

  return (
    <div>
      <div className="flex justify-end mr-6 gap-2 pb-[2.5rem] -mt-[4.4rem] md:mr-[5%] md:pb-[3.1rem] md:-mt-[5rem] lg:mr-[10%] 3xl:mr-[11%]">
        {/* @ts-expect-error: slickPrev library type*/}
        <button type="button" title="Previous slide" aria-label="Previous slide" onClick={() => slider?.current?.slickPrev()}><HiArrowLeft size={23} className="bg-[#ecebeb] p-3 rounded-full w-9 h-9 md:w-12 md:h-12" /></button>
        {/* @ts-expect-error: slickNext library type */}
        <button type="button" title="Next slide" aria-label="Next slide" onClick={() => slider?.current?.slickNext()}><HiArrowRight size={23} className="bg-[#ecebeb] p-3 rounded-full w-9 h-9 md:w-12 md:h-12" /></button>
      </div>
      <Slider ref={slider} {...settings}>
        {products.map(product => {
          return (
            <div key={product.id}>
              <ProductCard {...product} />
            </div>
          )
        })}
      </Slider>
    </div>
  );
};