import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  // Call your backend API instead of Stripe
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // remove if not needed
    },
    body: JSON.stringify({
      lineItems: body.lineItems,
      successUrl: `${process.env.NEXT_URL}/cart/checkout/success`,
      cancelUrl: `${process.env.NEXT_URL}/cart/checkout/cancel`
    }),
  });

  const data = await response.json();

  return NextResponse.json(data);
}
