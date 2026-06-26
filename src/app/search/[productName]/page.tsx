import { Metadata } from "next";

import { FilteredProducts } from "@/components/FilteredProducts";
import { mapRouteProduct, routeFetch } from "@/lib/route-api";
import type { RouteProduct } from "@/lib/route-types";

export const metadata: Metadata = { title: "Search Results" };
export const dynamic = "force-dynamic";

interface ParamsProps {
  params: Promise<{ productName: string }>;
}

export default async function Page({ params }: ParamsProps) {
  const resolvedParams = await params;
  const query = decodeURIComponent(resolvedParams.productName || "").trim();
  const response = await routeFetch<{ data: RouteProduct[] }>("products", {
    query: {
      limit: 200,
      keyword: query,
    },
  });

  const filtered = response.data.map(mapRouteProduct);

  return (
    <div>
      {filtered.length === 0 ? (
        <div className="flex items-center justify-center my-10 md:my-20 xl:my-40 2xl:my-60 3xl:my-96">
          <span className="font-medium cursor-default md:text-3xl">
            Sorry, no products were found.
          </span>
        </div>
      ) : (
        <div className="w-5/6 mx-auto grid grid-cols-1 gap-10 mt-20 mb-36 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
          {filtered.map((product) => (
            <FilteredProducts key={product.id} filteredProductByName={product} />
          ))}
        </div>
      )}
    </div>
  );
}
