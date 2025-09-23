"use client";

import { ProductCard } from "./product/ProductCard";

interface FilteredProductByName {
  filteredProductByName: {
    id: string;
    name: string;
    imageUrl: string | string[];
    description: string | null;
    price: number;
    defaultPriceId: string;
  }
}

export function FilteredProducts({ filteredProductByName }: FilteredProductByName) {
  return <ProductCard {...filteredProductByName} />
}