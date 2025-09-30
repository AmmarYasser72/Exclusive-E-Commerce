import { Metadata } from "next";
import { getBaseUrl } from "@/lib/base-url";
import { FilteredProducts } from "@/components/FilteredProducts";

export const metadata: Metadata = { title: "Search Results" };
// optional: avoid caching in edge/dev proxies
export const dynamic = "force-dynamic";

interface ParamsProps {
  params: { productName: string };
}

type UiProduct = {
  id: string;
  name: string;
  imageUrl: string[];
  description: string;
  price: number;
  defaultPriceId?: string | null;
};

/* ---------- helpers ---------- */
function toArrayImage(img: any): string[] {
  if (!img) return [];
  if (Array.isArray(img)) return img.filter(Boolean);
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
    description: String(x.description ?? x.desc ?? x.details ?? ""),
    price: normalizePrice(x.price ?? x.unit_price ?? x.price_cents ?? x.pricing),
    defaultPriceId: x.defaultPriceId ?? x.default_price_id ?? null,
  };
}

/* ---------- data ---------- */
async function getAllProducts(): Promise<UiProduct[]> {
  const base = getBaseUrl(); // absolute URL for server fetch
  const res = await fetch(`${base}/api/proxy/products?limit=200`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();

  const list: any[] = Array.isArray(data)
    ? data
    : (data.data ?? data.items ?? data.products ?? data.results ?? []);

  if (!Array.isArray(list)) return [];
  return list.map(mapApiProduct);
}

/* ---------- page ---------- */
export default async function Page({ params }: ParamsProps) {
  const query = decodeURIComponent(params.productName || "").trim().toLowerCase();
  const products = await getAllProducts();

  const filtered = query
    ? products.filter((p) => p.name.toLowerCase().includes(query))
    : products;

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
          {filtered.map((p) => (
            <FilteredProducts key={p.id} filteredProductByName={p} />
          ))}
        </div>
      )}
    </div>
  );
}
