"use client";

import { ProductsProps } from "@/src/app/page";
import { ProductCard } from "@/src/components/product/ProductCard";

export function AllProducts({ products }: ProductsProps) {
  return (
    <main className="w-5/6 mx-auto grid grid-cols gap-10 mt-20 mb-36 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 ">
      {products.map(product => {
        return (
          <ProductCard key={product.id} {...product} />
        )
      })}
    </main>
  )
}