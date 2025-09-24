import Link from "next/link";
import { Metadata } from "next";
import { getBaseUrl } from "@/lib/base-url";

import { JustForYouSlider } from "@/components/wishlist/slider/JustForYouSlider";
import { WishlistProducts } from "@/components/wishlist/WishlistProducts";

export const metadata: Metadata = {
  title: "Wishlist",
};

type UiProduct = {
  id: string;
  name: string;
  imageUrl: string[];
  price: number;
  defaultPriceId?: string | null;
};

function toArrayImage(img: any): string[] {
  if (!img) return [];
  if (Array.isArray(img)) return img as string[];
  if (typeof img === "string") return [img];
  const guess = img.url || img.src || img.thumbnail || img.main || "";
  return guess ? [guess] : [];
}

function normalizePrice(p: any): number {
  if (typeof p === "number") return p;
  if (typeof p === "string") return Number(p.replace(/[^0-9.]/g, "")) || 0;
  if (p?.amount) return Number(p.amount) || 0;
  if (p?.value) return Number(p.value) || 0;
  return 0;
}

function mapApiProduct(x: any): UiProduct {
  return {
    id: String(x.id ?? x._id ?? x.productId ?? x.sku ?? crypto.randomUUID()),
    name: String(x.title ?? x.name ?? x.product_name ?? "Untitled"),
    imageUrl: toArrayImage(
      x.images ??
        x.imageUrl ??
        x.image_url ??
        x.image ??
        x.thumbnail ??
        (x.media ? x.media.images : undefined)
    ),
    price: normalizePrice(x.price ?? x.unit_price ?? x.price_cents ?? x.pricing),
    defaultPriceId: x.defaultPriceId ?? x.default_price_id ?? null,
  };
}

async function getRecommended(): Promise<UiProduct[]> {
  const base = getBaseUrl(); // << use absolute base
  const res = await fetch(`${base}/api/proxy/products?limit=12`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();

  const list: any[] = Array.isArray(data)
    ? data
    : (data.data ?? data.items ?? data.products ?? data.results ?? []);

  if (!Array.isArray(list)) return [];
  return list.map(mapApiProduct).sort(() => 0.5 - Math.random());
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
