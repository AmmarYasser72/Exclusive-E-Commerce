import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductInfoCard } from "@/components/product/productPage/ProductInfoCard";
import { RelatedItemsSlider } from "@/components/product/relatedItemsSlider/RelatedItemsSlider";
import { SectionTag } from "@/components/Home/SectionTag";
import { SectionTitle } from "@/components/Home/SectionTitle";
import { mapRouteProduct, routeFetch } from "@/lib/route-api";
import type { RouteProduct } from "@/lib/route-types";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await routeFetch<{ data: RouteProduct }>(`products/${id}`);
    return {
      title: response.data.title,
      description: response.data.description,
    };
  } catch {
    return {
      title: "Product Details",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  let product: RouteProduct;

  try {
    const response = await routeFetch<{ data: RouteProduct }>(`products/${id}`);
    product = response.data;
  } catch {
    notFound();
  }

  const relatedResponse = await routeFetch<{ data: RouteProduct[] }>("products", {
    query: {
      limit: 8,
      category: product.category?._id,
    },
  }).catch(() => ({ data: [] }));

  const productView = mapRouteProduct(product);
  const relatedProducts = relatedResponse.data
    .filter((item) => (item.id ?? item._id) !== productView.id)
    .map(mapRouteProduct)
    .slice(0, 8);

  return (
    <main className="pb-24">
      <div className="mx-auto flex w-5/6 gap-3 pt-10 text-sm lg:pt-20">
        <Link href="/" className="opacity-50">
          Home
        </Link>
        <span className="opacity-50">/</span>
        <Link href="/products" className="opacity-50">
          Products
        </Link>
        <span className="opacity-50">/</span>
        <span className="font-medium">{productView.name}</span>
      </div>

      <ProductInfoCard
        productInfo={{
          ...productView,
          brandName: product.brand?.name,
          categoryName: product.category?.name,
          defaultPriceId: null,
        }}
      />

      {relatedProducts.length ? (
        <section className="mx-auto w-5/6">
          <SectionTag content="Related Items" />
          <SectionTitle content="You May Also Like" />
          <div className="mt-10">
            <RelatedItemsSlider products={relatedProducts} />
          </div>
        </section>
      ) : null}
    </main>
  );
}
