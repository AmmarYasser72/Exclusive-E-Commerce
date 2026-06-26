"use client";

export default function OrdersError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto my-24 w-11/12 max-w-2xl rounded border border-red-200 bg-red-50 p-8 text-center">
      <h1 className="mb-3 font-inter text-3xl font-semibold text-red-700">
        Orders could not load
      </h1>
      <p className="mb-6 text-sm text-red-700/80">
        This only affects the orders section.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded bg-exclusive-secondary px-6 py-3 text-sm font-medium text-white"
      >
        Try again
      </button>
    </main>
  );
}
