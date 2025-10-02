import Link from "next/link";
import Image from "next/image";

import { NavigationBar } from "@/components/Home/NavigationBar";
import { SectionTag } from "@/components/Home/SectionTag";
import { SectionTitle } from "@/components/Home/SectionTitle";
import { BestSellingSlider } from "@/components/Home/sliders/BestSellingSlider/BestSellingSlider";
import { BrowseByCategorySlider } from "@/components/Home/sliders/BrowseByCategorySlider/BrowseByCategorySlider";
import { Carousel } from "@/components/Home/sliders/Carousel/Carousel";
import { FlashSalesSlider } from "@/components/Home/sliders/FlashSalesSlider/FlashSalesSlider";
import { ExploreOurProductsSlider } from "@/components/Home/sliders/ExploreOurProductsSlider/ExploreOurProductsSlider";
import { NewArrival } from "@/components/Home/NewArrival";

import { HiArrowUp } from "react-icons/hi";
import { FlashSalesTimer } from "@/utils/FlashSalesTimer";
import { BestSellingProductsTimer } from "@/utils/BestSellingProductsTimer";
import { getBaseUrl } from "@/lib/base-url";

export const dynamic = "force-dynamic";

export interface UiProduct {
  id: string;
  name: string;
  imageUrl: string[];
  price: number;
  defaultPriceId?: string | null;
}

/* ---------------- helpers to normalize API ---------------- */
function normalizePrice(p: any): number {
  if (typeof p === "number") return p;
  if (typeof p === "string") return Number(p.replace(/[^0-9.]/g, "")) || 0;
  if (p?.amount && p?.currency) return Number(p.amount) || 0;
  if (p?.value) return Number(p.value) || 0;
  return 0;
}

function toArrayImage(img: any): string[] {
  if (!img) return [];
  if (Array.isArray(img)) return img.filter(Boolean) as string[];
  if (typeof img === "string") return [img];
  const guess = img.url || img.src || img.thumbnail || img.main || "";
  return guess ? [guess] : [];
}

function mapApiProduct(x: any): UiProduct {
  const img =
    (Array.isArray(x.images) && x.images[0]) ||
    x.imageCover ||
    x.image ||
    toArrayImage(
      x.images ??
        x.imageUrl ??
        x.image_url ??
        x.thumbnail ??
        (x.media ? x.media.images : undefined)
    )[0] ||
    "/placeholder.png";

  return {
    id: String(x._id ?? x.id ?? x.productId ?? x.sku ?? crypto.randomUUID()),
    name: String(x.title ?? x.name ?? x.product_name ?? "Untitled"),
    imageUrl: [img],
    price: normalizePrice(x.price ?? x.unit_price ?? x.price_cents ?? x.pricing),
    defaultPriceId: x.defaultPriceId ?? x.default_price_id ?? null,
  };
}

async function getProducts(): Promise<UiProduct[]> {
  try {
    const base = getBaseUrl();
    const res = await fetch(`${base}/api/proxy/products?limit=24`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();

    const list: any[] = Array.isArray(data)
      ? data
      : (data.data ?? data.items ?? data.products ?? data.results ?? []);

    if (!Array.isArray(list)) return [];
    return list.map(mapApiProduct).sort(() => 0.5 - Math.random());
  } catch {
    return [];
  }
}

/* ---------------- page ---------------- */
export default async function Home() {
  const products = await getProducts();

  return (
    <main className="w-11/12 lg:w-5/6 mx-auto ">
      <section className="mb-32 grid justify-start grid-cols-[auto_65%] md:grid-cols-[auto_85%] lg:grid-cols-[auto_70%] xl:grid-cols-[auto_78%] 2xl:grid-cols-[auto_84%] 3xl:grid-cols-[auto_87%]">
        <aside><NavigationBar /></aside>
        <div className="mx-4 mt-4 lg:ml-8 lg:mt-8"><Carousel /></div>
      </section>

      {/* Flash Sales */}
      <section className="border-b mb-20">
        <SectionTag content="Today's" />
        <div className="flex flex-col gap-8 mb-8 md:flex-row lg:gap-24">
          <SectionTitle content="Flash Sales" />
          <div className="mb-12 md:-mt-4 md:mb-0"><FlashSalesTimer /></div>
        </div>
        <div className="mb-16 -mr-6 md:-mr-10 lg:-mr-20 xl:-mr-28 2xl:-mr-40 3xl:-mr-56">
          <FlashSalesSlider products={products} />
        </div>
        <div className="flex justify-center">
          <Link
            href="/products"
            className="bg-exclusive-secondary hover:bg-exclusive-secondary-hover duration-200 text-exclusive-text-1 text-sm font-medium mb-16 py-4 px-12 rounded md:text-base"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b mb-20 pb-[4.375rem]">
        <SectionTag content="Categories" />
        <SectionTitle content="Browse By Category" />
        <div className="xl:-mr-7"><BrowseByCategorySlider /></div>
      </section>

      {/* Best Selling */}
      <section>
        <SectionTag content="This Month" />
        <div className="flex justify-between">
          <SectionTitle content="Best Selling Products" />
          <Link
            href="/products"
            className="bg-exclusive-secondary hover:bg-exclusive-secondary-hover duration-200 text-exclusive-text-1 py-2 px-6 text-sm font-medium mb-16 rounded md:text-base lg:py-4 lg:px-12"
          >
            View All
          </Link>
        </div>
        <div className="mb-36 xl:-mr-7"><BestSellingSlider products={products} /></div>

        {/* JBL banner */}
        <div className="bg-[#010101] flex flex-col mb-[4.375rem] md:flex-row 2xl:justify-center 2xl:gap-20 3xl:gap-96">
          <div className="flex flex-col mx-auto md:items-start md:ml-14 2xl:mx-0">
            <span className="text-exclusive-primary-1 mt-[4.375rem] mb-8 font-semibold">Categories</span>
            <h3 className="text-exclusive-text-1 mb-8 font-inter font-semibold text-4xl md:text-3xl lg:text-4xl xl:text-5xl ">
              Enhance Your<br /> Music Experience
            </h3>
            <BestSellingProductsTimer />
            <Link
              href="/products"
              className="mt-10 text-exclusive-text-2 bg-exclusive-primary-1 hover:opacity-80 mb-[4.375rem] py-4 px-12 duration-200 mx-auto rounded md:mx-0"
            >
              Buy now!
            </Link>
          </div>

          {/* ✅ JBL image – make sure this file exists at /public/home/bestSelling/JBL.svg */}
          <div className="mx-auto my-auto bg-[url('/home/whiteShadow.svg')] bg-center bg-no-repeat bg-[length:270px_250px] md:bg-[length:330px_330px] lg:bg-[length:450px_450px] xl:bg-[length:580px_580px] 2xl:mx-0 2xl:bg-[length:700px_800px]">
            <Image
              src="/home/bestSelling/JBL.svg"
              alt="JBL speaker"
              width={768}
              height={512}
              priority
              className="mb-0 p-16 md:mb-0 md:ml-4 md:w-[550px] md:p-20 lg:w-[680px] xl:w-[768px] h-auto"
            />
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="mb-36">
        <SectionTag content="Our Products" />
        <SectionTitle content="Explore Our Products" />
        <div className="xl:-mr-7"><ExploreOurProductsSlider products={products} /></div>
        <div className="flex justify-center">
          <Link
            href="/products"
            className="bg-exclusive-secondary hover:bg-exclusive-secondary-hover duration-200 text-exclusive-text-1 text-sm font-medium mb-16 py-4 px-12 rounded md:text-base"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* New Arrival */}
      <section>
        <SectionTag content="Featured" />
        <SectionTitle content="New Arrival" />
        <div className="flex"><NewArrival /></div>
      </section>

      {/* Services */}
      <section className="flex flex-col justify-center gap-20 items-center mb-16 lg:flex-row lg:gap-8 xl:gap-[5.5rem]">
        <div className="flex flex-col items-center">
          <Image src="/home/newArrival/botton/services.svg" width={100} height={100} alt="" className="mb-6 h-auto w-auto" />
          <span className="mb-2 font-semibold text-xl">FREE AND FAST DELIVERY</span>
          <span className="text-sm">Free delivery for all orders over $140</span>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/home/newArrival/botton/services2.svg" width={100} height={100} alt="" className="mb-6 h-auto w-auto" />
          <span className="mb-2 font-semibold text-xl">24/7 CUSTOMER SERVICE</span>
          <span className="text-sm">Friendly 24/7 customer support</span>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/home/newArrival/botton/services3.svg" width={100} height={100} alt="" className="mb-6 h-auto w-auto" />
          <span className="mb-2 font-semibold text-xl">MONEY BACK GUARANTEE</span>
          <span className="text-sm">We return money within 30 days</span>
        </div>
      </section>

      {/* Back to top */}
      <div className="flex justify-end mb-8">
        <Link href="#" className="bg-[#ecebeb] p-3 rounded-full w-12 h-12" aria-label="back to the top">
          <HiArrowUp size={24} />
        </Link>
      </div>
    </main>
  );
}
