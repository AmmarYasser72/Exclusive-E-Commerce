"use client";

import Slider, { Settings } from "react-slick";
// @ts-ignore - side-effect CSS
import "slick-carousel/slick/slick.css";
// @ts-ignore - side-effect CSS
import "../BestSellingSlider/BestSellingSlider.css";

import { ProductCard } from "@/components/product/ProductCard";

type Product = {
  id: string;
  name: string;
  imageUrl: string[] | string;
  price: number;
  defaultPriceId?: string | null;
};
export type ProductsProps = { products: Product[] };

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
    { breakpoint: 1200, settings: { slidesToShow: 2 } },
    { breakpoint: 800,  settings: { slidesToShow: 2 } },
    { breakpoint: 500,  settings: { slidesToShow: 1 } },
  ],
};

const toArray = (img: string[] | string): string[] =>
  Array.isArray(img) ? img.filter(Boolean) : (img ? [img] : []);

export function BestSellingSlider({ products }: ProductsProps) {
  if (!products?.length) {
    return <div className="py-8 text-center text-sm opacity-70">No products to display.</div>;
  }

  return (
    <div>
      <Slider {...settings}>
        {products.map((p) => (
          <div key={p.id}>
            <ProductCard
              id={p.id}
              name={p.name}
              imageUrl={toArray(p.imageUrl)}
              price={p.price}
              defaultPriceId={p.defaultPriceId}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
