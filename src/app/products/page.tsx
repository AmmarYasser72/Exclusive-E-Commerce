import { AllProducts } from "@/src/components/product/allProductsPage/AllProducts";

export default async function Page() {
  // Fetch all products from your backend API
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store"
  });

  // Expecting the API to return [{ id, name, images, price, defaultPriceId }]
  const productsData = await response.json();

  // Map the response if needed (adjust based on your API structure)
  const products = productsData.map((product: any) => ({
    id: product.id,
    name: product.name,
    imageUrl: product.images || [],
    price: product.price,
    defaultPriceId: product.defaultPriceId || null,
  })).sort(() => 0.5 - Math.random());

  return <AllProducts products={products} />;
}
