"use client"

import 'slick-carousel/slick/slick.css';
import './slick-theme.css';

import { useState, useContext } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { VscHeart } from 'react-icons/vsc'
import { TbRefresh, TbTruckDelivery } from 'react-icons/tb';
import { ProductRating } from '@/src/components/product/ProductRating';
import { CartAndWishlistContext } from '@/src/app/context/CartAndWishlistContextProvider';


interface ProductInfoProps {
  productInfo: {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string[] | string;
    price: number;
    defaultPriceId: string;
  }
}

export function ProductInfoCard({ productInfo }: ProductInfoProps) {
  const [nav1, setNav1] = useState<Slider | undefined>();
  const [nav2, setNav2] = useState<Slider | undefined>();
  const { handleBuyItem, handleAddItemOnWishlist, verifyItemOnWishlist, removeFromWishlist } = useContext(CartAndWishlistContext);
  const [quantity, setQuantity] = useState(1);

  const inStock = true;
  const hasSizes = false;
  const discountAmount = 20;
  const discount = true;



  function priceWithoutDiscount() {
    return productInfo.price + (productInfo.price * discountAmount / 100)
  }

  function increase() {
    if (quantity < 99) {
      setQuantity(quantity + 1)
    }
  }
  function decrease() {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <section className="w-full pl-4 mx-auto lg:w-5/6 lg:pl-0">
      <div className='grid grid-cols-[36%_64%] mt-20 mb-36 md:grid-cols-[26%_74%] 2xl:grid-cols-[15%_45%_auto] 3xl:grid-cols-[12%_48%_auto]'>
        <Slider asNavFor={nav1} ref={(slider2) => setNav2(slider2 as Slider)}
          slidesToShow={3.99}
          verticalSwiping={true}
          swipeToSlide={true}
          focusOnSelect={true}
          infinite={false}
          vertical={true}
          arrows={false}
          dots={false}
        >
          <div className='w-[170px] bg-[#f3f3f3] rounded focus:outline-none h-[71px] md:h-[115px] xl:h-[139.8px] 2xl:h-[134.8px]'>
            <Image src={productInfo.imageUrl?.[0]} alt='' width={121} height={135} quality={100} className='w-auto h-full p-4 mx-auto' />
          </div>
          <div className='w-[170px] bg-[#f3f3f3] rounded focus:outline-none h-[71px] md:h-[115px] xl:h-[139.8px] 2xl:h-[134.8px]'>
            <Image src={productInfo.imageUrl?.[0]} alt='' width={121} height={135} quality={100} className='w-auto h-full p-4 mx-auto' />
          </div>
          <div className='w-[170px] bg-[#f3f3f3] rounded focus:outline-none h-[71px] md:h-[115px] xl:h-[139.8px] 2xl:h-[134.8px]'>
            <Image src={productInfo.imageUrl?.[0]} alt='' width={121} height={135} quality={100} className='w-auto h-full p-4 mx-auto' />
          </div>
          <div className='w-[170px] bg-[#f3f3f3] rounded focus:outline-none h-[71px] md:h-[115px] xl:h-[139.8px] 2xl:h-[134.8px]'>
            <Image src={productInfo.imageUrl?.[0]} alt='' width={121} height={135} quality={100} className='w-auto h-full p-4 mx-auto' />
          </div>
          <div className='w-[170px] bg-[#f3f3f3] rounded focus:outline-none h-[71px] md:h-[115px] xl:h-[139.8px] 2xl:h-[134.8px]'>
            <Image src={productInfo.imageUrl?.[0]} alt='' width={121} height={135} quality={100} className='w-auto h-full p-4 mx-auto' />
          </div>
        </Slider>

        <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1 as Slider)}
          arrows={false}
          dots={false}
          slidesToShow={0.99}
        >
          <div className='w-[170px] bg-[#f3f3f3] rounded h-[312px] md:h-[488px] xl:h-[587px] 2xl:h-[567px] focus:outline-none'>
            <div className='w-full h-full flex items-center justify-center'>
              <Image src={productInfo.imageUrl?.[0]} alt='' width={800} height={600} quality={100} className='w-auto h-auto p-2 md:h-[315px] md:p-6' />
            </div>
          </div>
          <div className='w-[170px] bg-[#f3f3f3] rounded h-[312px] md:h-[488px] xl:h-[587px] 2xl:h-[567px] focus:outline-none'>
            <div className='w-full h-full flex items-center justify-center'>
              <Image src={productInfo.imageUrl?.[0]} alt='' width={800} height={600} quality={100} className='w-auto h-auto p-2 md:h-[315px] md:p-6' />
            </div>
          </div>
          <div className='w-[170px] bg-[#f3f3f3] rounded h-[312px] md:h-[488px] xl:h-[587px] 2xl:h-[567px] focus:outline-none'>
            <div className='w-full h-full flex items-center justify-center'>
              <Image src={productInfo.imageUrl?.[0]} alt='' width={800} height={600} quality={100} className='w-auto h-auto p-2 md:h-[315px] md:p-6' />
            </div>
          </div>
          <div className='w-[170px] bg-[#f3f3f3] rounded h-[312px] md:h-[488px] xl:h-[587px] 2xl:h-[567px] focus:outline-none'>
            <div className='w-full h-full flex items-center justify-center'>
              <Image src={productInfo.imageUrl?.[0]} alt='' width={800} height={600} quality={100} className='w-auto h-auto p-2 md:h-[315px] md:p-6' />
            </div>
          </div>
          <div className='w-[170px] bg-[#f3f3f3] rounded h-[312px] md:h-[488px] xl:h-[587px] 2xl:h-[567px] focus:outline-none'>
            <div className='w-full h-full flex items-center justify-center'>
              <Image src={productInfo.imageUrl?.[0]} alt='' width={800} height={600} quality={100} className='w-auto h-auto p-2 md:h-[315px] md:p-6' />
            </div>
          </div>
        </Slider>
        <div className='flex flex-col w-screen mt-20 pr-10 lg:w-[845px] 2xl:mt-0 2xl:w-auto 2xl:ml-[70px] 2xl:pr-4'>
          <h2 className='font-inter font-semibold text-2xl mb-3'>{productInfo.name}</h2>
          <div className='flex mb-3'>
            <ProductRating />
            {inStock
              ? <span className='-ml-16 text-green-400'><span className='text-exclusive-text-2'>|</span> In Stock</span>
              : <span className='-ml-16 text-red-400'><span className='text-exclusive-text-2'>|</span> Out of stock</span>}
          </div>
          {discount
            ? <div className='mb-6 flex gap-4'>
              <span className='font-inter text-2xl text-exclusive-secondary'>${productInfo.price}</span>
              <span className='font-inter text-2xl opacity-60 line-through'>${priceWithoutDiscount()}</span>
            </div>
            : <div className='mb-6 '>
              <span className='font-inter text-2xl'>${priceWithoutDiscount()}</span>
            </div>}
          <div className='border-b border-black/40 pb-6 mb-6'>
            <p className='text-sm'>{productInfo.description}</p>
          </div>
          {
            hasSizes
              ? <form className='mb-6 flex items-center gap-6' id='sizesForm'>
                <span className='font-inter text-xl'>Size:</span>
                <div className="flex flex-row gap-4 items-center">
                  <div>
                    <input type="radio" name="option" id="1" className="peer hidden" required />
                    <label
                      htmlFor="1"
                      className='outline outline-black/40 outline-1 rounded p-2 text-sm select-none cursor-pointer peer-checked:bg-exclusive-secondary peer-checked:text-exclusive-text-1 peer-checked:outline-none'
                    >XS</label>
                  </div>

                  <div>
                    <input type="radio" name="option" id="2" className="peer hidden" />
                    <label
                      htmlFor="2"
                      className='outline outline-black/40 outline-1 rounded py-2 px-3 text-sm select-none cursor-pointer peer-checked:bg-exclusive-secondary peer-checked:text-exclusive-text-1 peer-checked:outline-none'
                    >S</label>
                  </div>

                  <input type="radio" name="option" id="3" className="peer hidden" />
                  <label
                    htmlFor="3"
                    className='outline outline-black/40 outline-1 rounded p-2 text-sm select-none cursor-pointer peer-checked:bg-exclusive-secondary peer-checked:text-exclusive-text-1 peer-checked:outline-none'
                  >M</label>

                  <div>
                    <input type="radio" name="option" id="4" className="peer hidden" />
                    <label
                      htmlFor="4"
                      className='outline outline-black/40 outline-1 rounded py-2 px-3 text-sm select-none cursor-pointer peer-checked:bg-exclusive-secondary peer-checked:text-exclusive-text-1 peer-checked:outline-none'
                    >L</label>
                  </div>
                  <div>
                    <input type="radio" name="option" id="5" className="peer hidden" />
                    <label
                      htmlFor="5"
                      className='outline outline-black/40 outline-1 rounded p-2 text-sm select-none cursor-pointer peer-checked:bg-exclusive-secondary peer-checked:text-exclusive-text-1 peer-checked:outline-none'
                    >XL</label>
                  </div>
                </div>
              </form>
              : <div className='mb-6 flex items-center gap-6 opacity-40'>
                <span className='font-inter text-xl'>Size:</span>
                <div className="flex flex-row gap-4 items-center">
                  <div>
                    <input type="radio" name="option" id="1" className="peer hidden" disabled />
                    <label
                      htmlFor="1"
                      className='outline outline-black/40 outline-1 rounded p-2 text-sm select-none peer-checked:bg-exclusive-secondary peer-checked:text-exclusive-text-1 peer-checked:outline-none cursor-not-allowed'
                    >XS</label>
                  </div>

                  <div>
                    <input type="radio" name="option" id="2" className="peer hidden" disabled />
                    <label
                      htmlFor="2"
                      className='outline outline-black/40 outline-1 rounded py-2 px-3 text-sm select-none peer-checked:bg-exclusive-secondary peer-checked:text-exclusive-text-1 peer-checked:outline-none cursor-not-allowed'
                    >S</label>
                  </div>

                  <input type="radio" name="option" id="3" className="peer hidden" disabled />
                  <label
                    htmlFor="3"
                    className='outline outline-black/40 outline-1 rounded p-2 text-sm select-none peer-checked:bg-exclusive-secondary peer-checked:text-exclusive-text-1 peer-checked:outline-none cursor-not-allowed'
                  >M</label>

                  <div>
                    <input type="radio" name="option" id="4" className="peer hidden" disabled />
                    <label
                      htmlFor="4"
                      className='outline outline-black/40 outline-1 rounded py-2 px-3 text-sm select-none peer-checked:bg-exclusive-secondary peer-checked:text-exclusive-text-1 peer-checked:outline-none cursor-not-allowed'
                    >L</label>
                  </div>
                  <div>
                    <input type="radio" name="option" id="5" className="peer hidden" disabled />
                    <label
                      htmlFor="5"
                      className='outline outline-black/40 outline-1 rounded p-2 text-sm select-none peer-checked:bg-exclusive-secondary peer-checked:text-exclusive-text-1 peer-checked:outline-none cursor-not-allowed'
                    >XL</label>
                  </div>
                </div>
              </div>
          }

          <div className='flex items-center gap-3'>
            <div className='flex items-center border border-black/40 w-fit rounded'>
              <button className='px-2 py-2 hover:bg-exclusive-secondary rounded-s hover:text-exclusive-text-1' onClick={decrease}>
                <AiOutlineMinus size={24} />
              </button>
              <span className='py-2 border-l border-r border-black/40 w-14 text-center font md:w-16 2xl:w-20'>{quantity}</span>
              <button className='px-2 py-2 hover:bg-exclusive-secondary rounded-e hover:text-exclusive-text-1' onClick={increase}>
                <AiOutlinePlus size={24} />
              </button>
            </div>
            {hasSizes
              ? <button
                type='submit'
                form='sizesForm'
                className="bg-exclusive-secondary hover:bg-exclusive-secondary-hover duration-200 text-exclusive-text-1 text-sm font-medium py-[0.55rem] px-6 rounded md:text-base lg:px-11 xl:px-12"
                onClick={() => handleBuyItem(productInfo.id, productInfo.name, productInfo.imageUrl[0], productInfo.price, productInfo.defaultPriceId, quantity)}
              >
                Buy Now
              </button>
              : <button
                className="bg-exclusive-secondary hover:bg-exclusive-secondary-hover duration-200 text-exclusive-text-1 text-sm font-medium py-[0.55rem] px-6 rounded md:text-base lg:px-11 xl:px-12"
                onClick={() => handleBuyItem(productInfo.id, productInfo.name, productInfo.imageUrl[0], productInfo.price, productInfo.defaultPriceId, quantity)}
              >
                Buy Now
              </button>
            }
            {verifyItemOnWishlist(productInfo.id)
              ?
              <button
                className='border p-[0.55rem] rounded border-black/40 bg-red-500'
                onClick={() => removeFromWishlist(productInfo.id)}
              >
                <VscHeart size={20} />
              </button>
              : <button
                className='border p-[0.55rem] rounded border-black/40'
                onClick={() => handleAddItemOnWishlist(productInfo.id, productInfo.name, productInfo.imageUrl?.[0], productInfo.defaultPriceId, productInfo.price)}
              >
                <VscHeart size={20} />
              </button>
            }
          </div>
          <div className='w-[19.4rem] md:w-[20.4rem] mt-10 lg:w-[23rem] xl:w-[23.5rem] 2xl:w-[24.5rem]'>
            <div className='flex items-center gap-4 p-4 w-full border border-black/40 rounded-t'>
              <TbTruckDelivery size={40} />
              <div className='flex flex-col'>
                <span className='font-medium'>Free Delivery</span>
                <span className='font-medium text-xs'>Enter your postal code for Delivery Availability</span>
              </div>
            </div>
            <div className='flex items-center gap-4 p-4 border border-black/40 w-full rounded-b'>
              <TbRefresh size={40} />
              <div className='flex flex-col'>
                <span className='font-medium'>Return Delivery</span>
                <span className='font-medium text-xs'>Free 30 Days Delivery Returns. Details</span>
              </div>
            </div>
          </div>
        </div>
      </div >
    </section>
  )
}