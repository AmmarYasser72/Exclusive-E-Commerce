"use client";

import Link from "next/link";

export default function ProductDetailsError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto my-24 w-11/12 max-w-2xl rounded border border-red-200 bg-red-50 p-8 text-center">
      <h1 className="mb-3 font-inter text-3xl font-semibold text-red-700">
        Product details are unavailable
      </h1>
      <p className="mb-6 text-sm text-red-700/80">
        You can retry this page or continue browsing products.
      </p>
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded bg-exclusive-secondary px-6 py-3 text-sm font-medium text-white"
        >
          Try again
        </button>
        <Link href="/products" className="rounded border border-black/20 px-6 py-3 text-sm font-medium">
          All products
        </Link>
      </div>
    </main>
  );
}
