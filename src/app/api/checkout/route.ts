import { NextRequest, NextResponse } from "next/server";

const BASE = (
  process.env.NEXT_PUBLIC_ROUTE_API_BASE_URL ||
  process.env.BACKEND_API_URL ||
  "https://ecommerce.routemisr.com/api/v1"
).replace(/\/+$/, "");
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
const FALLBACK_TOKEN = process.env.BACKEND_BEARER_TOKEN;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({} as any));
  const { cartId, shippingAddress } = body || {};

  if (!cartId) {
    return NextResponse.json({ message: "cartId is required" }, { status: 400 });
  }

  const successUrl = `${SITE}/cart/checkout/success`;
  const token = req.headers.get("token") ?? FALLBACK_TOKEN ?? undefined;

  if (!token) {
    return NextResponse.json({ message: "Authentication token is required" }, { status: 401 });
  }

  const res = await fetch(
    `${BASE}/orders/checkout-session/${cartId}?url=${encodeURIComponent(successUrl)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ shippingAddress }),
      cache: "no-store",
    }
  );

  const ct = res.headers.get("content-type") || "";
  let payload: any;
  try {
    payload = ct.includes("application/json") ? await res.json() : await res.text();
  } catch {
    payload = null;
  }

  if (!res.ok) {
    return NextResponse.json(payload ?? { error: true }, { status: res.status });
  }

  return NextResponse.json(payload ?? { ok: true });
}
