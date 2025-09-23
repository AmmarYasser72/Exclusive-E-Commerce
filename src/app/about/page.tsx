import Link from "next/link";
import shopping from '@/public/about/shopping.svg'
import Image from "next/image";

import { CiShop } from 'react-icons/ci'
import { CiDollar } from 'react-icons/ci'
import { AiOutlineShopping } from 'react-icons/ai'
import { TbMoneybag } from 'react-icons/tb'
import { StaffSlider } from "@/src/components/about/slider/StaffSlider";

import services from '@/public/home/newArrival/botton/services.svg'
import services2 from '@/public/home/newArrival/botton/services2.svg'
import services3 from '@/public/home/newArrival/botton/services3.svg'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About"
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
          About
        </span>
      </div>

      <div className="flex flex-col mb-36 lg:flex-row-reverse items-center">
        <Image src={shopping} alt="" quality={100} className="w-full lg:w-2/4" />
        <div className="w-5/6 mx-auto mt-10 lg:w-1/3">
          <h2 className="text-center font-inter font-semibold text-3xl mb-10 lg:text-left lg:text-5xl">Our Story</h2>
          <p className="text-sm mb-6 lg:text-base">
            Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.
          </p>
          <p className="text-sm lg:text-base">
            Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a diverse assotment in categories ranging from consumer.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-8 mb-36 md:flex-row md:w-5/6 md:mx-auto md:flex-wrap lg:flex-nowrap">
        <div className="flex flex-col items-center outline outline-1 outline-black/20 rounded w-[270px] h-[230px] mx-auto py-8 hover:bg-exclusive-secondary hover:text-white hover:outline-none group duration-200 lg:mb-0 lg:w-full lg:h-auto">
          <span className="mb-6 bg-black/20 p-2 rounded-full group-hover:bg-white/40">
            <CiShop size={40} className="bg-black p-1 rounded-full text-white group-hover:bg-white group-hover:text-exclusive-text-2" />
          </span>
          <span className="font-inter font-bold text-3xl">10.5k </span>
          <span className="text-sm text-center 2xl:text-base">Sallers active in our site</span>
        </div>
        <div className="flex flex-col items-center outline outline-1 outline-black/20 rounded w-[270px] h-[230px] mx-auto py-8 hover:bg-exclusive-secondary hover:text-white hover:outline-none group duration-200 lg:w-full lg:h-auto ">
          <span className="mb-6 bg-black/20 p-2 rounded-full group-hover:bg-white/40">
            <CiDollar size={40} className="bg-black p-1 rounded-full text-white group-hover:bg-white group-hover:text-exclusive-text-2" />
          </span>
          <span className="font-inter font-bold text-3xl">33k</span>
          <span className="text-sm text-center 2xl:text-base">Monthly Product Sale</span>
        </div>
        <div className="flex flex-col items-center outline outline-1 outline-black/20 rounded w-[270px] h-[230px] mx-auto py-8 hover:bg-exclusive-secondary hover:text-white hover:outline-none group duration-200 lg:mb-0 lg:w-full lg:h-auto">
          <span className="mb-6 bg-black/20 p-2 rounded-full group-hover:bg-white/40">
            <AiOutlineShopping size={40} className="bg-black p-1 rounded-full text-white group-hover:bg-white group-hover:text-exclusive-text-2" />
          </span>
          <span className="font-inter font-bold text-3xl">45.5k</span>
          <span className="text-sm text-center 2xl:text-base">Customer active in our site</span>
        </div>
        <div className="flex flex-col items-center outline outline-1 outline-black/20 rounded w-[270px] h-[230px] mx-auto py-8 hover:bg-exclusive-secondary hover:text-white hover:outline-none group duration-200 lg:w-full lg:h-auto">
          <span className="mb-6 bg-black/20 p-2 rounded-full group-hover:bg-white/40">
            <TbMoneybag size={40} className="bg-black p-1 rounded-full text-white group-hover:bg-white group-hover:text-exclusive-text-2" />
          </span>
          <span className="font-inter font-bold text-3xl">25k</span>
          <span className="text-sm text-center 2xl:text-base">Anual gross sale in our site</span>
        </div>
      </div>
      <div className="w-5/6 mx-auto mb-48">
        <StaffSlider />
      </div>
      <section className="flex flex-col justify-center gap-20 items-center mb-32 lg:flex-row lg:gap-8 xl:gap-[5.5rem]">
        <div className="flex flex-col items-center">
          <Image src={services} width={100} height={0} alt="" className="mb-6" />
          <span className="mb-2 font-semibold text-xl">FREE AND FAST DELIVERY</span>
          <span className="text-sm">Free delivery for all orders over $140</span>
        </div>
        <div className="flex flex-col items-center">
          <Image src={services2} width={100} height={0} alt="" className="mb-6" />
          <span className="mb-2 font-semibold text-xl">24/7 CUSTOMER SERVICE</span>
          <span className="text-sm">Friendly 24/7 customer support</span>
        </div>
        <div className="flex flex-col items-center">
          <Image src={services3} width={100} height={0} alt="" className="mb-6" />
          <span className="mb-2 font-semibold text-xl">MONEY BACK GUARANTEE</span>
          <span className="text-sm">We reurn money within 30 days</span>
        </div>
      </section>
    </>
  )
}