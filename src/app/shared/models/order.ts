import { Address } from "./user";

export interface Order {
  id: number;
  buyerEmail: string;
  orderDate: string;
  shipToAddress: Address;
  deliveryMethod: string;
  shippingPrice: number;
  orderItems: OrderItem[];
  subtotal: number;
  total: number;
  status: string;
}

export interface OrderItem {
  artworkId: number;
  artworkName: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface OrderToCreate {
  basketId: string;
  deliveryMethodId: number;
  shipToAddress: Address;
}
