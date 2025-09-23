'use client';

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "./BrowseByCategorySlider.css";

import { useRef } from "react";
import { HiArrowRight } from 'react-icons/hi'
import { HiArrowLeft } from 'react-icons/hi'

import { TfiMobile } from 'react-icons/tfi'
import { SlScreenDesktop } from 'react-icons/sl'
import { IoWatchOutline } from 'react-icons/io5'
import { AiOutlineCamera } from 'react-icons/ai'
import { FiHeadphones } from 'react-icons/fi'
import { SiNintendo3Ds } from 'react-icons/si'
import Link from "next/link";

const settings: Settings = {
  dots: false,
  arrows: false,
  infinite: true,
  swipeToSlide: true,
  speed: 550,
  slidesToShow: 6,
  
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
      },
    },
  ]
};

export function BrowseByCategorySlider() {
  const slider = useRef(null);

  return (
    <div>
      <div className="flex justify-end gap-2 mb-[3.750rem] -mt-[2rem] md:-mt-[2.6rem] xl:-mt-0">
        {/* @ts-expect-error: slickPrev library type*/}
        <button onClick={() => slider?.current?.slickPrev()}><HiArrowLeft size={23} className="bg-[#ecebeb] p-3 rounded-full w-9 h-9 md:w-12 md:h-12 xl:hidden"  /></button>
        {/* @ts-expect-error: slickNext library type */}
        <button onClick={() => slider?.current?.slickNext()}><HiArrowRight size={23} className="bg-[#ecebeb] p-3 rounded-full w-9 h-9 md:w-12 md:h-12 xl:hidden" /></button>
      </div>
      <Slider ref={slider} {...settings}>
        <Link href="#">
          <div className="flex flex-col items-center justify-center gap-4 border rounded-md h-36 hover:bg-exclusive-secondary hover:text-exclusive-text-1">
            <TfiMobile size={56} />
            <span>Phones</span>
          </div>
        </Link>

        <Link href="#">
          <div className="flex flex-col items-center justify-center gap-4 border rounded-md h-36 hover:bg-exclusive-secondary hover:text-exclusive-text-1">
            <SlScreenDesktop size={56} />
            <span>Computers</span>
          </div>
        </Link>

        <Link href="#">
          <div className="flex flex-col items-center justify-center gap-4 border rounded-md h-36 hover:bg-exclusive-secondary hover:text-exclusive-text-1">
            <IoWatchOutline size={56} />
            <span>SmartWatch</span>
          </div>
        </Link>

        <Link href="#">
          <div className="flex flex-col items-center justify-center gap-4 border rounded-md h-36 hover:bg-exclusive-secondary hover:text-exclusive-text-1">
            <AiOutlineCamera size={56} />
            <span>Camera</span>
          </div>
        </Link>

        <Link href="#">
          <div className="flex flex-col items-center justify-center gap-4 border rounded-md h-36 hover:bg-exclusive-secondary hover:text-exclusive-text-1">
            <FiHeadphones size={56} />
            <span>HeadPhones</span>
          </div>
        </Link>

        <Link href="#">
          <div className="flex flex-col items-center justify-center gap-4 border rounded-md h-36 hover:bg-exclusive-secondary hover:text-exclusive-text-1">
            <SiNintendo3Ds size={56} />
            <span>Gaming</span>
          </div>
        </Link>
      </Slider>
    </div>
  );
};