import Link from "next/link";
import { BsTelephone } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import { Metadata } from "next";

export const metadata: Metadata = {
 title: 'Contact'
}

export default function page() {
  return (
    <>
      <div className="flex gap-3 mt-10 mb-10 text-sm w-5/6 mx-auto lg:mt-20 lg:mb-20">
        <Link href="#" className="opacity-50">
          Home
        </Link>
        <span className="opacity-50">
          /
        </span>
        <span className="font-medium cursor-default">
          Contact
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:w-5/6 lg:mx-auto lg:gap-8">
        <div className="bg-white shadow-md rounded gap-3 mb-8 p-8 w-5/6 mx-auto lg:mb-36 lg:w-2/5 2xl:w-1/4">
          <div>
            <header className="flex mb-6 gap-4 items-center">
              <span className="bg-exclusive-secondary rounded-full p-2">
                <BsTelephone size={22} className="text-white" />
              </span>
              <h2 className="font-medium">Call To Us</h2>
            </header>
            <div className="flex flex-col gap-4 pb-8 border-b border-black">
              <span className="text-sm font-medium">We are available 24/7, 7 days a week.</span>
              <span className="text-sm font-medium">Phone: +8801611112222</span>
            </div>
          </div>

          <div>
            <header className="flex mb-6 mt-8 gap-4 items-center">
              <span className="bg-exclusive-secondary rounded-full p-2">
                <AiOutlineMail size={22} className="text-white" />
              </span>
              <h2 className="font-medium">Write To US</h2>
            </header>
            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium">Fill out our form and we will contact you within 24 hours.</span>
              <span className="text-sm font-medium">Emails: customer@exclusive.com</span>
              <span className="text-sm font-medium">Emails: support@exclusive.com</span>
            </div>
          </div>
        </div>

        <form className="flex flex-col bg-white shadow-md rounded gap-3 mb-36 p-8 w-5/6 mx-auto">
          <div className="flex flex-col gap-4 lg:flex-row">
            <input className="bg-[#F5F5F5] p-3 w-full rounded" type="text" name="name" id="name" placeholder="Your Name *" required />
            <input className="bg-[#F5F5F5] p-3 w-full rounded" type="email" name="email" id="email" placeholder="Your Email *" required />
            <input className="bg-[#F5F5F5] p-3 w-full rounded" type="tel" name="phone" id="phone" placeholder="Your Phone *" required />
          </div>
          <textarea className="bg-[#F5F5F5] w-full h-72 p-3 resize-none rounded lg:h-full" name="" id="" placeholder="Your Massage" />
          <div className="flex lg:justify-end">
            <button type="submit" className="bg-exclusive-secondary hover:bg-exclusive-secondary-hover duration-200 text-exclusive-text-1 text-sm font-medium mt-8 py-4 px-12 rounded w-full md:text-base lg:w-fit">Send Massage</button>
          </div>
        </form>
      </div>
    </>
  )
}