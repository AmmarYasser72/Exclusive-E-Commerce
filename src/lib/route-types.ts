export interface RouteImageEntity {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface RouteSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface RouteProduct {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  sold: number;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  imageCover: string;
  images: string[];
  category?: RouteImageEntity;
  brand?: RouteImageEntity;
  subcategory?: RouteSubcategory[];
}

export interface RouteCategory extends RouteImageEntity {}
export interface RouteBrand extends RouteImageEntity {}

export interface RouteUser {
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  message: string;
  user: RouteUser;
  token: string;
}

export interface WishlistResponse {
  status: string;
  count: number;
  data: RouteProduct[];
}

export interface RouteCartLine {
  _id: string;
  count: number;
  price: number;
  product: RouteProduct;
}

export interface RouteCart {
  _id: string;
  cartOwner: string;
  totalCartPrice: number;
  products: RouteCartLine[];
}

export interface RouteCartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: RouteCart;
}

export interface RouteOrder {
  _id: string;
  id: number;
  createdAt: string;
  isPaid: boolean;
  isDelivered: boolean;
  paymentMethodType: "cash" | "card";
  totalOrderPrice: number;
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
  cartItems: Array<{
    _id: string;
    count: number;
    price: number;
    product: RouteProduct;
  }>;
}

export interface StoredSession {
  token: string;
  user: RouteUser & { id?: string };
}
