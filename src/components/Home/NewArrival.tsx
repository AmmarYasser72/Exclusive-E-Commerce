import Image from "next/image";
import Link from "next/link";

export function NewArrival() {
  return (
    <div className="mx-auto mb-16 grid gap-4 lg:grid-cols-[1.08fr_1fr]">
      <article className="relative min-h-[18rem] overflow-hidden rounded bg-black sm:min-h-[22rem] lg:min-h-[31.25rem]">
        <Image
          src="/home/newArrival/ps5Slim.svg"
          width={560}
          height={600}
          alt="PlayStation 5"
          priority
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5 text-exclusive-text-1 sm:p-7 lg:p-8">
          <span className="mb-2 block font-inter text-2xl font-semibold leading-none">
            PlayStation 5
          </span>
          <p className="max-w-[16rem] text-sm leading-6 sm:max-w-[18rem]">
            Black and White version of the PS5 coming out on sale.
          </p>
          <Link href="/products" className="mt-4 inline-block w-fit font-medium underline underline-offset-4">
            Shop Now
          </Link>
        </div>
      </article>

      <div className="grid gap-4">
        <article className="relative min-h-[14rem] overflow-hidden rounded bg-[#0C0C0C] sm:min-h-[17.5rem]">
          <Image
            src="/home/newArrival/womensCollections.svg"
            width={570}
            height={284}
            alt="Women's Collections"
            className="h-full w-full object-cover object-right"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent p-5 text-exclusive-text-1 sm:p-6">
            <span className="mb-2 block font-inter text-lg font-semibold sm:text-2xl">
              Women&apos;s Collections
            </span>
            <p className="max-w-[15rem] text-xs leading-5 sm:text-sm">
              Featured woman collections that give you another vibe.
            </p>
            <Link href="/products" className="mt-3 inline-block w-fit text-sm font-medium underline underline-offset-4">
              Shop Now
            </Link>
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-2">
          <article className="relative min-h-[12rem] overflow-hidden rounded bg-[linear-gradient(135deg,#1f1f1f_0%,#0a0a0a_60%,#000_100%)] sm:min-h-[17.625rem]">
            <Image
              src="/home/newArrival/amazonSpeakers.svg"
              width={240}
              height={240}
              alt="Amazon Speakers"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5 text-exclusive-text-1">
              <span className="mb-2 block font-inter text-xl font-semibold sm:text-2xl">
                Speakers
              </span>
              <p className="max-w-[8rem] text-xs leading-5 sm:text-sm">
                Amazon wireless speakers
              </p>
              <Link href="/products" className="mt-3 inline-block w-fit text-sm font-medium underline underline-offset-4">
                Shop Now
              </Link>
            </div>
          </article>

          <article className="relative min-h-[12rem] overflow-hidden rounded bg-[linear-gradient(135deg,#1f1f1f_0%,#0a0a0a_60%,#000_100%)] sm:min-h-[17.625rem]">
            <Image
              src="/home/newArrival/gucciPerfume.svg"
              width={240}
              height={240}
              alt="Gucci Intense Oud"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5 text-exclusive-text-1">
              <span className="mb-2 block font-inter text-xl font-semibold sm:text-2xl">
                Perfume
              </span>
              <p className="max-w-[8rem] text-xs leading-5 sm:text-sm">
                GUCCI INTENSE OUD EDP
              </p>
              <Link href="/products" className="mt-3 inline-block w-fit text-sm font-medium underline underline-offset-4">
                Shop Now
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
