import Link from "next/link";

export function Navigation() {
  return (
    <div className="flex gap-3 mt-10 mb-10 text-sm w-5/6 mx-auto lg:mt-20 lg:mb-20">
      <Link href="#" className="opacity-50">
        Home
      </Link>
      <span className="opacity-50">
        /
      </span>
      <Link href="/cart" className="opacity-50">
        Cart
      </Link>
      <span className="opacity-50">
        /
      </span>
      <span className="font-medium cursor-default">
        Checkout
      </span>
    </div>
  )
}