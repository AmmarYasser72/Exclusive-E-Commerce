'use client';

import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { AuthContext } from '@/app/context/AuthContextProvider';
import type {
  RouteCartResponse,
  RouteProduct,
  WishlistResponse,
} from '@/lib/route-types';

interface CartAndWishlistProviderProps {
  children: ReactNode;
}

export interface CartItem {
  id: string;
  cartItemId?: string;
  name?: string;
  imageURL?: string;
  price?: number;
  quantity?: number;
  defaultPriceId?: string | null;
}

export interface WishlistItem {
  id: string;
  name: string;
  imageURL: string;
  price: number;
  defaultPriceId?: string | null;
}

interface CartAndWishlistItemContext {
  cartItems: CartItem[];
  cartQuantity: number;
  wishlistItems: WishlistItem[];
  cartId: string | null;
  cartTotal: number;
  handleAddItemOnCart: (
    id: string,
    name: string,
    imageURL: string,
    price: number,
    defaultPriceId: string | null | undefined,
    quantity: number
  ) => Promise<void>;
  handleBuyItem: (
    id: string,
    name: string,
    imageURL: string,
    price: number,
    defaultPriceId: string | null | undefined,
    quantity: number
  ) => Promise<void>;
  increaseItemQuantity: (id: string) => Promise<void>;
  decreaseItemQuantity: (id: string) => Promise<void>;
  getItemQuantity: (id: string) => number;
  removeFromCart: (id: string) => Promise<void>;
  handleAddItemOnWishlist: (
    id: string,
    name: string,
    imageURL: string,
    defaultPriceId: string | null | undefined,
    price: number
  ) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  verifyItemOnWishlist: (id: string) => boolean;
  handleMoveItemsFromWishlistToCart: () => Promise<void>;
  handleCheckout: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  refreshCart: () => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

export const CartAndWishlistContext = createContext({} as CartAndWishlistItemContext);

async function proxyRequest<T>(path: string, init: RequestInit = {}, token?: string) {
  const response = await fetch(`/api/proxy/${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { token } : {}),
      ...(init.headers ?? {}),
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || payload?.error || 'Request failed');
  }

  return payload as T;
}

function mapCartResponse(cart: RouteCartResponse | null) {
  if (!cart?.data?.products) {
    return {
      cartId: null,
      cartTotal: 0,
      items: [] as CartItem[],
    };
  }

  return {
    cartId: cart.cartId ?? cart.data._id ?? null,
    cartTotal: Number(cart.data.totalCartPrice ?? 0),
    items: cart.data.products.map((item) => ({
      id: item.product.id ?? item.product._id,
      cartItemId: item._id,
      name: item.product.title,
      imageURL: item.product.imageCover,
      price: item.price,
      quantity: item.count,
      defaultPriceId: null,
    })),
  };
}

function mapWishlistResponse(wishlist: WishlistResponse | null) {
  if (!wishlist?.data) return [] as WishlistItem[];

  return wishlist.data.map((product: RouteProduct) => ({
    id: product.id ?? product._id,
    name: product.title,
    imageURL: product.imageCover,
    price: product.price,
    defaultPriceId: null,
  }));
}

export function CartAndWishlistProvider({ children }: CartAndWishlistProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartTotal, setCartTotal] = useState(0);

  const router = useRouter();
  const { token, isAuthenticated } = useContext(AuthContext);

  const resetCollections = useCallback(() => {
    setCartItems([]);
    setWishlistItems([]);
    setCartId(null);
    setCartTotal(0);
  }, []);

  const refreshCart = useCallback(async () => {
    if (!token) {
      setCartItems([]);
      setCartId(null);
      setCartTotal(0);
      return;
    }

    try {
      const cart = await proxyRequest<RouteCartResponse>('cart', { method: 'GET' }, token);
      const mapped = mapCartResponse(cart);

      setCartItems(mapped.items);
      setCartId(mapped.cartId);
      setCartTotal(mapped.cartTotal);
    } catch (error) {
      if (error instanceof Error && /no cart/i.test(error.message)) {
        setCartItems([]);
        setCartId(null);
        setCartTotal(0);
        return;
      }

      throw error;
    }
  }, [token]);

  const refreshWishlist = useCallback(async () => {
    if (!token) {
      setWishlistItems([]);
      return;
    }

    const wishlist = await proxyRequest<WishlistResponse>('wishlist', { method: 'GET' }, token);
    setWishlistItems(mapWishlistResponse(wishlist));
  }, [token]);

  useEffect(() => {
    if (!token) {
      resetCollections();
      return;
    }

    void Promise.all([refreshCart(), refreshWishlist()]);
  }, [refreshCart, refreshWishlist, resetCollections, token]);

  const cartQuantity = useMemo(
    () => cartItems.reduce((quantity, item) => (item.quantity ?? 0) + quantity, 0),
    [cartItems]
  );

  const requireAuth = useCallback(() => {
    if (isAuthenticated && token) return true;

    router.push('/log-in');
    return false;
  }, [isAuthenticated, router, token]);

  async function handleAddItemOnCart(
    id: string,
    _name: string,
    _imageURL: string,
    _price: number,
    _defaultPriceId: string | null | undefined,
    quantity: number
  ) {
    if (!requireAuth() || !token) return;

    await proxyRequest<RouteCartResponse>(
      'cart',
      {
        method: 'POST',
        body: JSON.stringify({ productId: id }),
      },
      token
    );

    if (quantity > 1) {
      await proxyRequest<RouteCartResponse>(
        `cart/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ count: quantity }),
        },
        token
      );
    }

    await refreshCart();
  }

  async function handleBuyItem(
    id: string,
    name: string,
    imageURL: string,
    price: number,
    defaultPriceId: string | null | undefined,
    quantity: number
  ) {
    await handleAddItemOnCart(id, name, imageURL, price, defaultPriceId, quantity);
    router.push('/cart');
  }

  async function increaseItemQuantity(id: string) {
    if (!token) return;
    const nextQuantity = getItemQuantity(id) + 1;

    await proxyRequest<RouteCartResponse>(
      `cart/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ count: nextQuantity }),
      },
      token
    );

    await refreshCart();
  }

  async function decreaseItemQuantity(id: string) {
    if (!token) return;
    const currentQuantity = getItemQuantity(id);

    if (currentQuantity <= 1) {
      await removeFromCart(id);
      return;
    }

    await proxyRequest<RouteCartResponse>(
      `cart/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ count: currentQuantity - 1 }),
      },
      token
    );

    await refreshCart();
  }

  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  async function removeFromCart(id: string) {
    if (!token) return;

    await proxyRequest<RouteCartResponse>(`cart/${id}`, { method: 'DELETE' }, token);
    await refreshCart();
  }

  async function handleAddItemOnWishlist(
    id: string,
    _name: string,
    _imageURL: string,
    _defaultPriceId: string | null | undefined,
    _price: number
  ) {
    if (!requireAuth() || !token) return;

    await proxyRequest(
      'wishlist',
      {
        method: 'POST',
        body: JSON.stringify({ productId: id }),
      },
      token
    );

    await refreshWishlist();
  }

  async function removeFromWishlist(id: string) {
    if (!token) return;

    await proxyRequest(`wishlist/${id}`, { method: 'DELETE' }, token);
    await refreshWishlist();
  }

  function verifyItemOnWishlist(id: string) {
    return wishlistItems.some((currentItem) => currentItem.id === id);
  }

  async function handleMoveItemsFromWishlistToCart() {
    if (!token || !wishlistItems.length) return;

    for (const item of wishlistItems) {
      await proxyRequest(
        'cart',
        {
          method: 'POST',
          body: JSON.stringify({ productId: item.id }),
        },
        token
      );
    }

    await proxyRequest('wishlist', { method: 'DELETE' }, token).catch(() => null);
    await Promise.all([refreshCart(), refreshWishlist()]);
  }

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token || !cartId) {
      router.push('/log-in');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const shippingAddress = {
      details: String(formData.get('streetAddress') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      city: String(formData.get('townCity') ?? ''),
    };
    const paymentMethod = String(formData.get('paymentMethod') ?? 'online');

    if (paymentMethod === 'cash') {
      await proxyRequest(
        `orders/${cartId}`,
        {
          method: 'POST',
          body: JSON.stringify({ shippingAddress }),
        },
        token
      );

      await refreshCart();
      router.push('/orders');
      return;
    }

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify({ cartId, shippingAddress }),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(payload?.message || payload?.error || 'Checkout failed');
    }

    if (payload?.session?.url) {
      window.location.href = payload.session.url;
    }
  }

  return (
    <CartAndWishlistContext.Provider
      value={{
        cartItems,
        cartQuantity,
        wishlistItems,
        cartId,
        cartTotal,
        handleAddItemOnCart,
        handleBuyItem,
        increaseItemQuantity,
        decreaseItemQuantity,
        getItemQuantity,
        removeFromCart,
        handleAddItemOnWishlist,
        removeFromWishlist,
        verifyItemOnWishlist,
        handleMoveItemsFromWishlistToCart,
        handleCheckout,
        refreshCart,
        refreshWishlist,
      }}
    >
      {children}
    </CartAndWishlistContext.Provider>
  );
}
