"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/app/context/AuthContextProvider";
import type { RouteOrder } from "@/lib/route-types";

export default function OrdersPage() {
  const { token, user, isAuthenticated } = useContext(AuthContext);
  const [orders, setOrders] = useState<RouteOrder[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token || !user?.id) {
      setIsLoading(false);
      return;
    }

    async function loadOrders() {
      const userId = user?.id;
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/proxy/orders/user/${userId}`, {
          headers: { token: token ?? "" },
        });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.message || "Unable to load orders.");
        }

        setOrders(Array.isArray(payload) ? payload : payload.value ?? []);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load orders.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadOrders();
  }, [token, user?.id]);

  if (!isAuthenticated) {
    return (
      <section className="mx-auto my-20 w-11/12 max-w-3xl rounded-2xl border border-black/10 bg-white p-10 text-center shadow-sm">
        <h1 className="mb-4 font-inter text-3xl font-semibold">Your orders</h1>
        <p className="mb-6 text-neutral-600">Log in first to view your previous cash and online orders.</p>
        <Link href="/log-in" className="rounded bg-exclusive-secondary px-6 py-3 text-white">
          Go to login
        </Link>
      </section>
    );
  }

  return (
    <main className="mx-auto w-5/6 py-14">
      <p className="mb-3 text-sm uppercase tracking-[0.2em] text-exclusive-secondary">Orders</p>
      <h1 className="mb-10 font-inter text-4xl font-semibold">Your order history</h1>

      {isLoading ? <p>Loading orders...</p> : null}
      {error ? <p className="text-red-500">{error}</p> : null}

      {!isLoading && !orders.length ? (
        <div className="rounded-2xl border border-dashed border-black/15 p-10 text-center text-neutral-600">
          No orders yet. Once you place a cash or online order, it will appear here.
        </div>
      ) : null}

      <div className="space-y-6">
        {orders.map((order) => (
          <article key={order._id} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-neutral-500">Order #{order.id}</p>
                <h2 className="font-semibold">
                  {order.paymentMethodType === "cash" ? "Cash on delivery" : "Online payment"}
                </h2>
              </div>
              <div className="text-sm text-neutral-600">
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Total: ${order.totalOrderPrice}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {order.cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 rounded-2xl bg-[#fafafa] p-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white p-3">
                    <Image src={item.product.imageCover} alt={item.product.title} width={72} height={72} className="h-14 w-auto object-contain" />
                  </div>
                  <div>
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-sm text-neutral-500">Qty: {item.count}</p>
                    <p className="text-sm text-neutral-500">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
