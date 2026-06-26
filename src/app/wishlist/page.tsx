import Link from "next/link";
import { Metadata } from "next";

import { JustForYouSlider } from "@/components/wishlist/slider/JustForYouSlider";
import { WishlistProducts } from "@/components/wishlist/WishlistProducts";
import { mapRouteProduct, routeFetch } from "@/lib/route-api";
import type { RouteProduct } from "@/lib/route-types";

export const metadata: Metadata = {
  title: "Wishlist",
};

async function getRecommended() {
  const response = await routeFetch<{ data: RouteProduct[] }>("products", {
    query: { limit: 12 },
  });

  return response.data.map(mapRouteProduct).sort(() => 0.5 - Math.random());
}

export default async function Page() {
  const products = await getRecommended();

  return (
    <section className="w-5/6 mx-auto">
      <div className="mb-20">
        <WishlistProducts />
      </div>

      <div className="mb-20">
        <header className="flex justify-between mb-16">
          <div className="flex items-center gap-4">
            <span className="bg-exclusive-secondary rounded w-4 h-8 lg:w-5 lg:h-10" />
            <span className="text-xl">Just For You</span>
          </div>
          <Link
            href="/products"
            className="font-medium py-4 border border-black/40 rounded px-6 md:px-12"
          >
            See All
          </Link>
        </header>

        <div className="xl:-mr-6">
          <JustForYouSlider products={products} />
        </div>
      </div>
    </section>
  );
}
