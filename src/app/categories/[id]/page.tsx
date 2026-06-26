import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

import { AllProducts } from "@/components/product/allProductsPage/AllProducts";
import { mapRouteCategory, mapRouteProduct, routeFetch } from "@/lib/route-api";
import type { RouteCategory, RouteProduct } from "@/lib/route-types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryDetailsPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const [categoryResponse, productsResponse] = await Promise.all([
      routeFetch<{ data: RouteCategory }>(`categories/${id}`),
      routeFetch<{ data: RouteProduct[] }>("products", {
        query: {
          "category[in]": id,
          limit: 40,
        },
      }),
    ]);

    const category = mapRouteCategory(categoryResponse.data);
    const products = productsResponse.data.map(mapRouteProduct);

    return (
      <main className="pb-20">
        <section className="mx-auto mt-14 flex w-5/6 flex-col gap-8 rounded-3xl bg-[#f7f7f7] p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 flex gap-3 text-sm">
              <Link href="/" className="opacity-50">Home</Link>
              <span className="opacity-50">/</span>
              <Link href="/categories" className="opacity-50">Categories</Link>
              <span className="opacity-50">/</span>
              <span className="font-medium">{category.name}</span>
            </div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-exclusive-secondary">Category details</p>
            <h1 className="font-inter text-4xl font-semibold">{category.name}</h1>
          </div>
          <div className="flex h-32 w-56 items-center justify-center rounded-2xl bg-white p-6">
            <Image src={category.image} alt={category.name} width={180} height={90} className="h-20 w-auto object-contain" />
          </div>
        </section>

        <AllProducts products={products} />
      </main>
    );
  } catch {
    notFound();
  }
}
