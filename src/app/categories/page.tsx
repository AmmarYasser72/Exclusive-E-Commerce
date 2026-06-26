import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

import { mapRouteCategory, routeFetch } from "@/lib/route-api";
import type { RouteCategory } from "@/lib/route-types";

export const metadata: Metadata = {
  title: "Categories",
};

export default async function CategoriesPage() {
  const response = await routeFetch<{ data: RouteCategory[] }>("categories", {
    query: { limit: 30 },
  });

  const categories = response.data.map(mapRouteCategory);

  return (
    <main className="mx-auto w-5/6 py-14">
      <p className="mb-3 text-sm uppercase tracking-[0.2em] text-exclusive-secondary">Categories</p>
      <h1 className="mb-10 font-inter text-4xl font-semibold">Browse by category</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="flex items-center gap-5 rounded-2xl border border-black/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[#f7f7f7] p-4">
              <Image src={category.image} alt={category.name} width={90} height={90} className="h-16 w-auto object-contain" />
            </div>
            <div>
              <p className="mb-2 text-xl font-medium">{category.name}</p>
              <p className="text-sm text-neutral-500">Explore products from this category</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
