import Link from 'next/link';
import { SectionTag } from '@/src/components/Home/SectionTag';
import { RelatedItemsSlider } from '@/src/components/product/relatedItemsSlider/RelatedItemsSlider';
import { ProductInfoCard } from '@/src/components/product/productPage/ProductInfoCard';

interface ParamsProps {
  params: {
    id: string;
    name?: string;
  }
}

// ✅ Replace Stripe with your API for metadata
export async function generateMetadata({ params }: ParamsProps) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store"
  });

  const products = await response.json(); // Expecting [{ id, name, ... }]
  const productInfo = products.find((product: any) => product.id === params.id);

  return {
    title: `${productInfo?.name || "Product"}`,
  };
}

export default async function Page({ params }: ParamsProps) {
  // ✅ Fetch all products from your backend
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store"
  });

  const productsData = await response.json();

  // Adjust to your API structure
  const products = productsData.map((product: any) => ({
    id: product.id,
    name: product.name,
    imageUrl: product.images || [],
    description: product.description,
    price: product.price,
    defaultPriceId: product.defaultPriceId || null,
  })).sort(() => 0.5 - Math.random());

  const productInfo = products.find((product: any) => product.id === params.id);

  return (
    <>
      <div className="flex gap-2 mt-20 text-xs ml-3 lg:text-sm lg:gap-3 lg:w-5/6 lg:mx-auto">
        <Link href="#" className="opacity-50">
          Home
        </Link>
        <span className="opacity-50">/</span>
        <Link href="/products" className="opacity-50">
          Products
        </Link>
        <span className="opacity-50">/</span>
        <span className="font-medium cursor-default">
          {productInfo?.name}
        </span>
      </div>
      <ProductInfoCard productInfo={productInfo!} />
      <section className='w-11/12 mx-auto lg:w-5/6 mb-36'>
        <div className='mb-16'>
          <SectionTag content="Related Item" />
        </div>
        <div className='xl:-mr-3'>
          <RelatedItemsSlider products={products} />
        </div>
      </section>
    </>
  )
}
