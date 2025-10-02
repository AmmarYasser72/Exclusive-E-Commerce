import { Metadata } from "next";
import { getBaseUrl } from "@/lib/base-url";
import { AllProducts } from "@/components/product/allProductsPage/AllProducts";

export const metadata: Metadata = { title: "All Products" };
export const dynamic = "force-dynamic";

type UiProduct = {
  id: string;
  name: string;
  imageUrl: string[];
  price: number;
  defaultPriceId?: string | null;
};

function toArrayImage(x: any): string[] {
  // RouteMisr: imageCover + images[]
  if (Array.isArray(x?.images) && x.images.length) return x.images.filter(Boolean);
  if (x?.imageCover) return [x.imageCover];
  if (typeof x?.image === "string") return [x.image];
  return [];
}

function mapFromYourApi(x: any): UiProduct {
  return {
    id: String(x._id ?? x.id),
    name: String(x.title ?? x.name ?? "Untitled"),
    imageUrl: toArrayImage(x),
    price: Number(x.price ?? x.priceAfterDiscount ?? 0) || 0,
    defaultPriceId: null,
  };
}

async function getAllFromYourApi(): Promise<UiProduct[]> {
  const base = getBaseUrl();

  // ✅ correct proxy URL (no extra /api/v1)
  const res = await fetch(`${base}/api/proxy/products?limit=200`, { cache: "no-store" });
  if (!res.ok) return [];

  const data = await res.json();

  // RouteMisr returns { results, metadata, data: [ ... ] }
  const list: any[] = Array.isArray(data)
    ? data
    : data.data ?? data.products ?? data.results ?? data.items ?? [];

  if (!Array.isArray(list)) return [];
  return list.map(mapFromYourApi);
}

export default async function Page() {
  const products = await getAllFromYourApi();
  return <AllProducts products={products} />;
}
