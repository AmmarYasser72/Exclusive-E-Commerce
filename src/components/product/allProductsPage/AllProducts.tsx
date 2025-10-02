"use client";

import { ProductCard } from "@/components/product/ProductCard";

type UiProduct = {
  id: string;
  name: string;
  imageUrl: string[] | string;
  price: number;
  defaultPriceId?: string | null;
};

export type ProductsProps = {
  products: UiProduct[];
};

const toArray = (img: string[] | string): string[] =>
  Array.isArray(img) ? img : img ? [img] : [];

export function AllProducts({ products }: ProductsProps) {
  if (!products?.length) {
    return (
      <main className="w-5/6 mx-auto my-24">
        <div className="rounded-md border border-neutral-200 p-8 text-center">
          No products found.
        </div>
      </main>
    );
  }

  return (
    <main className="w-5/6 mx-auto grid grid-cols-1 gap-10 mt-20 mb-36 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          name={p.name}
          imageUrl={toArray(p.imageUrl)}
          price={p.price}
          defaultPriceId={p.defaultPriceId ?? undefined}
        />
      ))}
    </main>
  );
}
