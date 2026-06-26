import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const CHECKOUT_API_BASE = (
  process.env.NEXT_PUBLIC_ROUTE_API_BASE_URL ||
  process.env.BACKEND_API_URL ||
  "https://ecommerce.routemisr.com/api/v1"
).replace(/\/+$/, "");

const CHECKOUT_API_TOKEN =
  process.env.BACKEND_BEARER_TOKEN || process.env.NEXT_PUBLIC_API_TOKEN;

interface PageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const sessionId = String(resolvedSearchParams.session_id ?? "");

  if (!sessionId) {
    throw new Error("Missing checkout session id");
  }

  const response = await fetch(`${CHECKOUT_API_BASE}/checkout/session/${sessionId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(CHECKOUT_API_TOKEN ? { token: CHECKOUT_API_TOKEN } : {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load checkout session");
  }

  const data = await response.json();
  const customerName = data.customerName;
  const products = data.products;

  return (
    <div className="w-5/6 mx-auto flex justify-center">
      {products?.length === 1 ? (
        <div className="flex flex-col my-24 lg:my-36 3xl:my-48">
          <div className="flex flex-col items-center mb-20 text-lg md:text-2xl lg:text-3xl">
            <h1>Thank you for using our services,</h1>
            <span>
              <strong>{customerName}</strong>!
            </span>
          </div>
          <div className="flex flex-col items-center text-sm lg:text-lg">
            <span className="mb-10">The following product is being prepared for shipment:</span>
            {products?.map((product: any, index: number) => (
              <div key={index} className="flex mb-8 items-center gap-4">
                <Image src={product.image} width={80} height={80} alt={product.description} />
                <span>
                  <strong>{product.quantity}x {product.description}</strong>
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/"
            className="bg-exclusive-secondary hover:bg-exclusive-secondary-hover duration-200 text-exclusive-text-1 text-sm font-medium mt-20 py-4 px-12 rounded text-center md:text-base"
          >
            Back to home page
          </Link>
        </div>
      ) : (
        <div className="flex flex-col my-24 lg:my-36">
          <div className="flex flex-col items-center mb-20 text-lg md:text-2xl lg:text-3xl">
            <h1>Thank you for using our services,</h1>
            <span>
              <strong>{customerName}</strong>!
            </span>
          </div>
          <div className="flex flex-col text-sm lg:text-lg">
            <span className="mb-10">The following products are being prepared for shipment:</span>
            {products?.map((product: any, index: number) => (
              <div key={index} className="flex mb-8 items-center gap-4">
                <Image src={product.image} width={80} height={80} alt={product.description} />
                <span>
                  <strong>{product.quantity}x {product.description}</strong>
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/"
            className="bg-exclusive-secondary hover:bg-exclusive-secondary-hover duration-200 text-exclusive-text-1 text-sm font-medium mt-20 py-4 px-12 rounded text-center md:text-base"
          >
            Back to home page
          </Link>
        </div>
      )}
    </div>
  );
}
