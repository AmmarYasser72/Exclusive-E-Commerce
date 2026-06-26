import { Metadata } from "next";

import { AllProducts } from "@/components/product/allProductsPage/AllProducts";
import { mapRouteProduct, routeFetch } from "@/lib/route-api";
import type { RouteProduct } from "@/lib/route-types";

export const metadata: Metadata = { title: "All Products" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const response = await routeFetch<{ data: RouteProduct[] }>("products", {
    query: { limit: 200 },
  });

  const products = response.data.map(mapRouteProduct);
  return <AllProducts products={products} />;
}
