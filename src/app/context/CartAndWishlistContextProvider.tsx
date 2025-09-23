'use client';

import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useEffect, useState } from 'react'

interface CartAndWishlistProviderProps {
  children: ReactNode
}

export interface CartItem {
  id: string,
  name?: string,
  imageURL?: string,
  price?: number,
  quantity?: number,
  defaultPriceId?: string,
}

export interface WishlistItem {
  id: string,
  name: string,
  imageURL: string,
  price: number,
  defaultPriceId?: string,
}

interface CartAndWishlistItemContext {
  cartItems: CartItem[],
  cartQuantity: number,
  wishlistItems: WishlistItem[],
  handleAddItemOnCart: (id: string, name: string, imageURL: string, price: number, defaultPriceId: string, quantity: number) => void,
  handleBuyItem: (id: string, name: string, imageURL: string, price: number, defaultPriceId: string, quantity: number) => void,
  increaseItemQuantity: (id: string) => void
  decreaseItemQuantity: (id: string) => void
  getItemQuantity: (id: string) => number,
  removeFromCart: (id: string) => void,
  handleAddItemOnWishlist: (id: string, name: string, imageURL: string, defaultPriceId: string, price: number) => void,
  removeFromWishlist: (id: string) => void,
  verifyItemOnWishlist: (id: string) => boolean | undefined,
  handleMoveItemsFromWishlistToCart: () => void,
  handleCheckout: (e: React.FormEvent) => void,
}

export const CartAndWishlistContext = createContext({} as CartAndWishlistItemContext);

export function CartAndWishlistProvider({ children }: CartAndWishlistProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const retrieveProducts = JSON.parse(localStorage.getItem('Exclusive-CartItems') || "[]");

    const retrieveWishlist = JSON.parse(localStorage.getItem('Exclusive-WishlistItems') || "[]");

    if (retrieveProducts) {
      setCartItems(retrieveProducts)
    }

    if (retrieveWishlist) {
      setWishlistItems(retrieveWishlist)
    }
  }, [])

  useEffect(() => {
    if (cartItems.length == 0) {
      localStorage.setItem("Exclusive-CartItems", "[]")
    } else {
      localStorage.setItem("Exclusive-CartItems", JSON.stringify(cartItems))
    }

    if (wishlistItems.length == 0) {
      localStorage.setItem("Exclusive-WishlistItems", "[]")
    } else {
      localStorage.setItem("Exclusive-WishlistItems", JSON.stringify(wishlistItems))
    }
  }, [cartItems, wishlistItems])


  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity! + quantity, 0
  )

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault()

    setIsCreatingCheckoutSession(true)

    const lineItems = cartItems.map(item => {
      return {
        price: item.defaultPriceId,
        quantity: item.quantity,
      }
    })

    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ lineItems: lineItems })
    })

    const { checkoutUrl } = await response.json()
    window.location.href = checkoutUrl

    setCartItems([])
  }

  function handleAddItemOnCart(id: string, name: string, imageURL: string, price: number, defaultPriceId: string, quantity: number) {
    setCartItems(currentItem => {
      if (currentItem.find(item => item.name === name) == null) {
        return [...currentItem, { id, name, imageURL, price, defaultPriceId, quantity }]
      } else {
        return currentItem.map(item => {
          if (item.name === name) {
            return { ...item, quantity: item.quantity! + quantity }
          } else {
            return item
          }
        })
      }
    })
  }

  function handleBuyItem(id: string, name: string, imageURL: string, price: number, defaultPriceId: string, quantity: number) {
    setCartItems(currentItem => {
      if (currentItem.find(item => item.name === name) == null) {
        return [...currentItem, { id, name, imageURL, price, defaultPriceId, quantity }]
      } else {
        return currentItem.map(item => {
          if (item.name === name) {
            return { ...item, quantity: item.quantity! + quantity }
          } else {
            return item
          }
        })
      }
    })
    router.push("/cart")
  }

  function increaseItemQuantity(id: string) {
    setCartItems(currentItem => {
      if (currentItem.find(item => item.id === id) == null) {
        return [...currentItem, { id, quantity: 1 }]
      } else {
        return currentItem.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity! + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseItemQuantity(id: string) {
    setCartItems(currentItem => {
      if (currentItem.find(item => item.id === id)?.quantity == 1) {
        return currentItem.filter(item => item.id !== id)
      } else {
        return currentItem.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity! - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function getItemQuantity(id: string) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function removeFromCart(id: string) {
    setCartItems(currentItem => {
      return currentItem.filter(item => item.id !== id)
    })
  }


  function handleAddItemOnWishlist(id: string, name: string, imageURL: string, defaultPriceId: string, price: number) {
    setWishlistItems(currentItem => {
      if (currentItem.find(item => item.name === name) == null) {
        return [...currentItem, { id, name, imageURL, price, defaultPriceId, quantity: 1 }]
      } else {
        return currentItem.map(item => {
          if (item.name === name) {
            return { ...item }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromWishlist(id: string) {
    setWishlistItems(currentItem => {
      return currentItem.filter(item => item.id !== id)
    })
  }

  function verifyItemOnWishlist(id: string) {
    if (wishlistItems?.length) {
      return wishlistItems.some(currentItem => currentItem.id === id)
    }
  }

  function handleMoveItemsFromWishlistToCart() {
    if (cartItems.length == 0) {
      setCartItems(cartItems.concat(wishlistItems))
    } else {
      setCartItems(cartItems.concat(wishlistItems.filter(item => !cartItems.some(cartItem => cartItem.id == item.id))))
    }
    setWishlistItems([])
    localStorage.setItem("Exclusive-WishlistItems", "[]")
  }


  return (
    <CartAndWishlistContext.Provider
      value={{
        cartItems,
        cartQuantity,
        handleAddItemOnCart,
        handleBuyItem,
        increaseItemQuantity,
        decreaseItemQuantity,
        getItemQuantity,
        removeFromCart,
        handleAddItemOnWishlist,
        removeFromWishlist,
        wishlistItems,
        verifyItemOnWishlist,
        handleMoveItemsFromWishlistToCart,
        handleCheckout,
      }}
    >
      {children}
    </CartAndWishlistContext.Provider>
  )
}