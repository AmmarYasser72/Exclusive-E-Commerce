import type {
  RouteBrand,
  RouteCategory,
  RouteProduct,
} from "@/lib/route-types";

export const ROUTE_API_BASE =
  process.env.NEXT_PUBLIC_ROUTE_API_BASE_URL?.replace(/\/+$/, "") ??
  "https://ecommerce.routemisr.com/api/v1";

type RouteFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  query?: Record<string, string | number | undefined>;
  token?: string;
};

export async function routeFetch<T>(
  path: string,
  { body, query, token, headers, ...init }: RouteFetchOptions = {}
): Promise<T> {
  const searchParams = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.set(key, String(value));
      }
    });
  }

  const queryString = searchParams.toString();
  const url = `${ROUTE_API_BASE}/${path.replace(/^\/+/, "")}${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { token } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: init.cache ?? "no-store",
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload?.message || payload?.errors?.msg || "Route API request failed";
    throw new Error(message);
  }

  return payload as T;
}

export function mapRouteProduct(product: Partial<RouteProduct> & Record<string, any>) {
  const imageGallery = Array.isArray(product.images) ? product.images : [];

  return {
    id: String(product.id ?? product._id ?? ""),
    name: String(product.title ?? "Untitled product"),
    slug: String(product.slug ?? ""),
    description: String(product.description ?? ""),
    price: Number(product.price ?? 0),
    sold: Number(product.sold ?? 0),
    quantity: Number(product.quantity ?? 0),
    rating: Number(product.ratingsAverage ?? 0),
    ratingCount: Number(product.ratingsQuantity ?? 0),
    imageUrl: [
      product.imageCover,
      ...imageGallery.filter((image) => image && image !== product.imageCover),
    ].filter(Boolean) as string[],
    category: product.category,
    brand: product.brand,
    subcategory: product.subcategory ?? [],
  };
}

export function mapRouteCategory(category: RouteCategory) {
  return {
    id: category._id,
    name: category.name,
    slug: category.slug,
    image: category.image,
  };
}

export function mapRouteBrand(brand: RouteBrand) {
  return {
    id: brand._id,
    name: brand.name,
    slug: brand.slug,
    image: brand.image,
  };
}
