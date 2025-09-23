import { JustForYouSlider } from "@/src/components/wishlist/slider/JustForYouSlider";
import { stripe } from "@/src/lib/stripe";
import Link from "next/link";
import Stripe from "stripe";
import { Metadata } from "next";
import { WishlistProducts } from "@/src/components/wishlist/WishlistProducts";

export const metadata: Metadata = {
  title: "Wishlist"
}

export default async function page() {

  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images,
      price: price.unit_amount! / 100,
      defaultPriceId: price.id,
    }
  }).sort(() => 0.5 - Math.random())

  return (
    <section className="w-5/6 mx-auto">
      <div className="mb-20">
        <WishlistProducts />
      </div>
      <div className="mb-20">
        <header className="flex justify-between mb-16">
          <div className="flex items-center gap-4">
            <span className="bg-exclusive-secondary rounded w-4 h-8 lg:w-5 lg:h-10"></span>
            <span className="text-xl">Just For You</span>
          </div>
          <Link href="/products" className="font-medium py-4 border border-black/40 rounded px-6 md:px-12">See All</Link>
        </header>
        <div className="xl:-mr-6">
          <JustForYouSlider products={products} />
        </div>
      </div>
    </section>
  )
}