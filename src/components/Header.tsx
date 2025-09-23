import Image from 'next/image'
import Exclusive from '@/public/header/logo-header.svg'
import Link from 'next/link'

import { Search } from './Search'
import { WishlistAndCart } from './header/WishlistAndCart'

export function Header() {
  return (
    <header className="flex flex-col flex-wrap border-b border-opacity-30 border-black">
      <section className="bg-black text-exclusive-text-1 text-sm text-center py-3 px-3 ">
        <span className='pr-2 '>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
        <Link href="#" className='font-semibold underline underline-offset-2'>ShopNow</Link>
      </section>

      <section className='flex flex-col items-center gap-4 mt-12 mb-6 lg:flex-row lg:justify-between lg:mx-auto lg:w-5/6' >
        <div className='flex flex-col justify-center flex-wrap mb-4 md:mb-0 md:flex-row'>
          <h1 className='mx-auto mb-6 md:mb-2 md:mr-4 lg:mt-1 lg:mr-8 xl:mr-32 2xl:mr-48'>
            <Link href="#">
              <Image
                src={Exclusive}
                width={0}
                height={0}
                quality={100}
                alt='go to home page'
              />
            </Link>
          </h1>

          <div>
            <ul className='flex gap-3 items-center text-sm lg:text-lg xl:gap-6 2xl:gap-12'>
              <li>
                <Link href="#" className='hover:underline underline-offset-[5px] decoration-black/50'>Home</Link>
              </li>
              <li>
                <Link href="/contact" className='hover:underline underline-offset-[5px] decoration-black/50'>Contact</Link>
              </li>
              <li>
                <Link href="/about" className='hover:underline underline-offset-[5px] decoration-black/50'>About</Link>
              </li>
              <li>
                <Link href="/sign-up" className='hover:underline underline-offset-[5px] decoration-black/50'>Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='flex gap-6 mx-4 items-center justify-center md:justify-between'>
          <Search />
          <WishlistAndCart />
        </div>
      </section>
    </header>
  )
}