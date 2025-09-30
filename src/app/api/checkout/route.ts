import { NextRequest, NextResponse } from "next/server";

const BASE = (process.env.BACKEND_API_URL || "").replace(/\/+$/, "");
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
const FALLBACK_BEARER = process.env.BACKEND_BEARER_TOKEN; // optional

export async function POST(req: NextRequest) {
  if (!BASE) {
    return NextResponse.json({ error: "BACKEND_API_URL is not set" }, { status: 500 });
  }

  // Expect { cartId?, lineItems?, ...rest }
  const body = await req.json().catch(() => ({} as any));
  const { cartId, lineItems, ...rest } = body || {};

  // Build absolute return URLs
  const successUrl = `${SITE}/cart/checkout/success`;
  const cancelUrl  = `${SITE}/cart/checkout/cancel`;

  // Forward auth from the caller if present; otherwise use server token if configured
  const callerAuth = req.headers.get("authorization");
  const authHeader =
    callerAuth || (FALLBACK_BEARER ? `Bearer ${FALLBACK_BEARER}` : undefined);

  // Two common modes:
  // 1) Routemisr style: POST /orders/checkout-session/:cartId?url=<success>
  // 2) Generic custom:  POST /checkout with { lineItems, successUrl, cancelUrl }
  let url: string;
  let init: RequestInit;

  if (cartId) {
    url = `${BASE}/orders/checkout-session/${cartId}?url=${encodeURIComponent(successUrl)}`;
    init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      // routemisr expects (optionally) { shippingAddress, phone, ... }
      body: JSON.stringify(rest),
    };
  } else {
    url = `${BASE}/checkout`;
    init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify({ lineItems, successUrl, cancelUrl, ...rest }),
    };
  }

  const res = await fetch(url, init);

  const ct = res.headers.get("content-type") || "";
  let payload: any;
  try {
    payload = ct.includes("application/json") ? await res.json() : await res.text();
  } catch {
    payload = null;
  }

  if (!res.ok) {
    return NextResponse.json(
      { error: true, status: res.status, payload },
      { status: res.status }
    );
  }

  return NextResponse.json(payload ?? { ok: true });
}
