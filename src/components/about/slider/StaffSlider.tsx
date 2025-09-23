'use client';

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "./StaffSlider.css"

import { StaffMemberCard } from "../StaffMemberCard";
import comTruise from '@/public/about/staff/ComTruise.svg'
import wemmaEtson from '@/public/about/staff/WemmaEtson.svg'
import smillSwitch from '@/public/about/staff/SmillSwitch.svg'

const settings: Settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 900,
  autoplay: true,
  autoplaySpeed: 3500,
  pauseOnHover: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
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
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ]
};

export function StaffSlider() {
  return (
    <div>
      <Slider {...settings}>
        <div>
          <StaffMemberCard
            src={comTruise}
            name="Com Truise"
            role="Founder & Chairman"
            twitter="https://twitter.com"
            instagram="https://www.instagram.com/"
            linkedin="https://linkedin.com"
          />
        </div>
        <div>
          <StaffMemberCard
            src={wemmaEtson}
            name="Wemma Etson"
            role="Managing Director"
            twitter="https://twitter.com"
            instagram="https://www.instagram.com/"
            linkedin="https://linkedin.com"
          />
        </div>
        <div>
          <StaffMemberCard
            src={smillSwitch}
            name="Smill Switch"
            role="Product Designer"
            twitter="https://twitter.com"
            instagram="https://www.instagram.com/"
            linkedin="https://linkedin.com"
          />
        </div>
        <div>
          <StaffMemberCard
            src={comTruise}
            name="Com Truise"
            role="Founder & Chairman"
            twitter="https://twitter.com"
            instagram="https://www.instagram.com/"
            linkedin="https://linkedin.com"
          />
        </div>
        <div>
          <StaffMemberCard src={wemmaEtson}
            name="Wemma Etson"
            role="Managing Director"
            twitter="https://twitter.com"
            instagram="https://www.instagram.com/"
            linkedin="https://linkedin.com"
          />
        </div>
        <div>
          <StaffMemberCard
            src={smillSwitch}
            name="Smill Switch"
            role="Product Designer"
            twitter="https://twitter.com"
            instagram="https://www.instagram.com/"
            linkedin="https://linkedin.com"
          />
        </div>
      </Slider>
    </div>
  );
};