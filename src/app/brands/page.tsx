import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

import { mapRouteBrand, routeFetch } from "@/lib/route-api";
import type { RouteBrand } from "@/lib/route-types";

export const metadata: Metadata = {
  title: "Brands",
};

export default async function BrandsPage() {
  const response = await routeFetch<{ data: RouteBrand[] }>("brands", {
    query: { limit: 60 },
  });

  const brands = response.data.map(mapRouteBrand);

  return (
    <main className="mx-auto w-5/6 py-14">
      <p className="mb-3 text-sm uppercase tracking-[0.2em] text-exclusive-secondary">Brands</p>
      <h1 className="mb-10 font-inter text-4xl font-semibold">Shop by brand</h1>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.id}`}
            className="group rounded-2xl border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-6 flex h-28 items-center justify-center rounded-xl bg-[#f7f7f7] p-4">
              <Image src={brand.image} alt={brand.name} width={120} height={80} className="h-16 w-auto object-contain" />
            </div>
            <p className="text-lg font-medium transition group-hover:text-exclusive-secondary">{brand.name}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
