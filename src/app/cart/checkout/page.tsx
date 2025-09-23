import { Navigation } from "@/src/components/checkout/Navigation";
import { Metadata } from "next";
import { ShowCheckoutData } from "@/src/components/checkout/ShowCheckoutData";
import CheckoutForm from "@/src/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout"
}

export default function page() {
  return (
    <>
      <Navigation />
      <h2 className="mb-12 font-inter text-4xl font-medium w-5/6 mx-auto">Billing Details</h2>
      <div className="flex flex-col w-5/6 mx-auto xl:flex-row xl:gap-44">
        <CheckoutForm />
        <ShowCheckoutData />
      </div>
    </>
  )
}