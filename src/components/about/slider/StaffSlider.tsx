'use client';

import Slider, { Settings } from 'react-slick';
// @ts-ignore: CSS module or global stylesheet without type declarations
import 'slick-carousel/slick/slick.css';
// @ts-ignore: CSS module or local stylesheet without type declarations
import './StaffSlider.css';

import { StaffMemberCard } from '../StaffMemberCard';

// If StaffMemberCard expects ImageProps-like `src`, passing string paths is valid.
const COM = '/about/staff/ComTruise.svg';
const WEMMA = '/about/staff/WemmaEtson.svg';
const SMILL = '/about/staff/SmillSwitch.svg';

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
    { breakpoint: 1600, settings: { slidesToShow: 3 } },
    { breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 800,  settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 500,  settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

export function StaffSlider() {
  return (
    <div>
      <Slider {...settings}>
        <div>
          <StaffMemberCard
            src={COM}
            name="Com Truise"
            role="Founder & Chairman"
            twitter="https://twitter.com"
            instagram="https://www.instagram.com/"
            linkedin="https://linkedin.com"
          />
        </div>
        <div>
          <StaffMemberCard
            src={WEMMA}
            name="Wemma Etson"
            role="Managing Director"
            twitter="https://twitter.com"
            instagram="https://www.instagram.com/"
            linkedin="https://linkedin.com"
          />
        </div>
        <div>
          <StaffMemberCard
            src={SMILL}
            name="Smill Switch"
            role="Product Designer"
            twitter="https://twitter.com"
            instagram="https://www.instagram.com/"
            linkedin="https://linkedin.com"
          />
        </div>
        <div>
          <StaffMemberCard
            src={COM}
            name="Com Truise"
            role="Founder & Chairman"
            twitter="https://twitter.com"
            instagram="https://www.instagram.com/"
            linkedin="https://linkedin.com"
          />
        </div>
        <div>
          <StaffMemberCard
            src={WEMMA}
            name="Wemma Etson"
            role="Managing Director"
            twitter="https://twitter.com"
            instagram="https://www.instagram.com/"
            linkedin="https://linkedin.com"
          />
        </div>
        <div>
          <StaffMemberCard
            src={SMILL}
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
}
