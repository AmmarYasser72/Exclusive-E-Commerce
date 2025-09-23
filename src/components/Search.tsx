"use client";

import { HiMagnifyingGlass } from "react-icons/hi2";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Search() {
  const [productName, setProductName] = useState("")
  const router = useRouter()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const productName = event.target.value

    setProductName(productName)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (productName) {
     router.push(`/search/${productName}`)
    } else {
      router.push('/products')
    }

  }

  return (
    <form className='flex items-center md:mr-6' onSubmit={handleSubmit}>
      <input
        type="text"
        alt='Search for products'
        placeholder='What are you looking for?'
        className='text-xs bg-[#eeeeee] rounded py-2 w-60 pl-5'
        onChange={handleChange}
      />
      <button aria-label='Search'>
        <HiMagnifyingGlass size={23} className='-ml-[2.16rem]' type='submit' />
      </button>
    </form>
  )
}