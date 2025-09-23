import { FilteredProducts } from "@/src/components/FilteredProducts";

interface ParamsProps {
  params: {
    productName: string;
  }
}

export default async function Page({ params }: ParamsProps) {
  // Fetch products from your backend API
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  // Expecting your API to return [{ id, name, images, description, price }]
  const productsData = await response.json();

  // Transform if needed based on your API structure
  const products = productsData.map((product: any) => ({
    id: product.id,
    name: product.name,
    imageUrl: product.images || [],
    description: product.description || "",
    price: product.price,
    defaultPriceId: product.defaultPriceId || null,
  }));

  // Filter products by name (case insensitive)
  const filteredProductsByName = products.filter((product: any) =>
    product.name.toLowerCase().includes(params.productName.toLowerCase())
  );

  return (
    <div>
      {filteredProductsByName.length === 0 ? (
        <div className="flex items-center justify-center my-10 md:my-20 xl:my-40 2xl:my-60 3xl:my-96">
          <span className="font-medium cursor-default md:text-3xl">
            Sorry, no products were found.
          </span>
        </div>
      ) : (
        <div className="w-5/6 mx-auto grid grid-cols gap-10 mt-20 mb-36 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
          {filteredProductsByName.map((filteredProductByName: any) => (
            <FilteredProducts
              key={filteredProductByName.id}
              filteredProductByName={filteredProductByName}
            />
          ))}
        </div>
      )}
    </div>
  );
}
