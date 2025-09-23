'use client';

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "./Carousel.css"
import { Iphone14 } from "./IPhone14";

const settings: Settings = {
  dots: true,
  dotsClass: "slick-dots slick-thumb",
  arrows: false,
  infinite: true,
  speed: 650,
  autoplay: true,
  autoplaySpeed: 3400,
  pauseOnHover: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export function Carousel() {
  return (
    <div>
      <Slider {...settings}>
        <div>
          <Iphone14 />
        </div>
        <div>
          <Iphone14 />
        </div>
        <div>
          <Iphone14 />
        </div>
        <div>
          <Iphone14 />
        </div>
        <div>
          <Iphone14 />
        </div>
      </Slider>
    </div>
  );
};