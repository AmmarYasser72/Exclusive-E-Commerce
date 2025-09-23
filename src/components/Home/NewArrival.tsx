import ps5Slim from "@/public/home/newArrival/ps5Slim.svg"
import womensCollections from "@/public/home/newArrival/womensCollections.svg"
import amazonSpeakers from "@/public/home/newArrival/amazonSpeakers.svg"
import gucciPerfume from '@/public/home/newArrival/gucciPerfume.svg'
import Image from "next/image"
import Link from "next/link"


export function NewArrival() {
  return (
    <div className="flex flex-col mx-auto mb-[8.750rem] gap-8 md:flex-row">
      <div>
        <Image src={ps5Slim} width={560} height={0} alt="" className="bg-black rounded pt-20 h-full" />
        <div className="flex flex-col text-exclusive-text-1 gap-4 -mt-[8.5rem] mb-4 ml-4 xl:-mt-40">
          <span className="font-inter font-semibold xl:text-2xl">PlayStation 5</span>
          <span className="text-sm">Black and White version of the PS5 <br /> coming out on sale.</span>
          <Link href="#" className="w-fit font-medium underline-offset-4 underline">Shop Now</Link>
        </div>
      </div>

      <div className="flex flex-col gap-8 items-center">
        <div className="flex rounded">
          <div className="absolute left-8 mt-7 md:relative lg:mt-10">
            <div className="flex flex-col gap-4 text-exclusive-text-1 md:absolute md:w-max md:-mx-4 lg:mt-12 xl:mt-24 xl:gap-6 2xl:gap-8">
              <span className="font-inter font-semibold xl:text-2xl">Women’s Collections</span>
              <span className="text-xs xl:text-sm">Featured woman collections that <br /> give you another vibe.</span>
              <Link href="#" className="w-fit font-medium underline-offset-4 underline">Shop Now</Link>
            </div>
          </div>
          <Image src={womensCollections} width={570} height={0} alt="" className="bg-[#0C0C0C] pl-28 rounded lg:pl-20 " />
        </div>

        <div className="flex gap-8 w-full h-full">
          <div>
            <div className="absolute left-8 mt-16 md:relative md:mt-0 md:left-4">
              <div className="flex flex-col gap-2 text-exclusive-text-1 md:absolute md:w-max md:mt-[7.6rem] xl:mt-32 2xl:mt-[8.9rem] ">
                <span className="font-inter font-semibold xl:text-2xl">Speakers</span>
                <span className="text-xs xl:text-sm">Amazon <br /> wireless speakers</span>
                <Link href="#" className="w-fit text-sm font-medium underline-offset-4 underline lg:text-base">Shop Now</Link>
              </div>
            </div>
            <Image src={amazonSpeakers} width={240} height={0} alt="" className="bg-gradient-to-br from-black via-[#3a3a3a] to-black w-full h-full rounded md:mt-0 p-5 lg:p-8 " />
          </div>
          <div>
            <div className="absolute ml-2 mt-16 md:relative md:mt-0 md:left-4">
              <div className="flex flex-col gap-2 text-exclusive-text-1 md:absolute md:w-max md:mt-[7.6rem] xl:mt-32 2xl:mt-[8.9rem] ">
                <span className="font-inter font-semibold xl:text-2xl">Perfume</span>
                <span className="text-xs xl:text-sm">GUCCI <br /> INTENSE OUD EDP</span>
                <Link href="#" className="w-fit text-sm font-medium underline-offset-4 underline lg:text-base">Shop Now</Link>
              </div>
            </div>
            <Image src={gucciPerfume} width={240} height={0} alt="" className="bg-gradient-to-br from-black via-[#3a3a3a] to-black w-full h-full rounded md:mt-0 p-5 lg:p-8" />
          </div>
        </div>
      </div>
    </div>
  )
}