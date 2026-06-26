"use client";

import { useContext } from "react";
import { CheckoutCheckbox } from "./CheckoutCheckbox";
import { CartAndWishlistContext } from "@/app/context/CartAndWishlistContextProvider";

export default function CheckoutForm() {
  const { handleCheckout } = useContext(CartAndWishlistContext)

  return (
    <form className="xl:w-full" id="checkoutForm" onSubmit={(e) => handleCheckout(e)}>
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-2 opacity-50">First Name <span className="text-exclusive-secondary">*</span></label>
        <input
          type="text"
          name="name"
          id="name"
          className="bg-[#F5F5F5] p-3 w-full rounded mb-8"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="companyName" className="mb-2 opacity-50">Company Name</label>
        <input
          type="text"
          name="companyName"
          id="companyName"
          className="bg-[#F5F5F5] p-3 w-full rounded mb-8"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="streetAddress" className="mb-2 opacity-50">Street Address<span className="text-exclusive-secondary">*</span></label>
        <input
          type="text"
          name="streetAddress"
          id="streetAddress"
          className="bg-[#F5F5F5] p-3 w-full rounded mb-8"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="apartmentFloorEtc" className="mb-2 opacity-50">Apartment, floor, etc. (optional)</label>
        <input
          type="text"
          name="apartmentFloorEt"
          id="apartmentFloorEt"
          className="bg-[#F5F5F5] p-3 w-full rounded mb-8"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="townCity" className="mb-2 opacity-50">Town/City<span className="text-exclusive-secondary">*</span></label>
        <input
          type="text"
          name="townCity"
          id="townCity"
          className="bg-[#F5F5F5] p-3 w-full rounded mb-8"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="phone" className="mb-2 opacity-50">Phone Number<span className="text-exclusive-secondary">*</span></label>
        <input
          type="tel"
          name="phone"
          id="phone"
          className="bg-[#F5F5F5] p-3 w-full rounded mb-8"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 opacity-50">Email Address<span className="text-exclusive-secondary">*</span></label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-[#F5F5F5] p-3 w-full rounded mb-8"
          required
        />
      </div>
      <div className="mb-8">
        <span className="mb-3 block opacity-70">Payment method</span>
        <div className="flex flex-col gap-3 md:flex-row">
          <label className="flex items-center gap-3 rounded border border-black/10 px-4 py-3">
            <input type="radio" name="paymentMethod" value="online" defaultChecked />
            <span>Online payment</span>
          </label>
          <label className="flex items-center gap-3 rounded border border-black/10 px-4 py-3">
            <input type="radio" name="paymentMethod" value="cash" />
            <span>Cash on delivery</span>
          </label>
        </div>
      </div>
      <CheckoutCheckbox />
    </form>
  )
}
