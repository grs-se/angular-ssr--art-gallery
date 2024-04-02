import * as cuid from 'cuid';

export interface BasketItem {
  id: number;
  artworkName: string;
  price: number;
  quantity: number;
  imageUrl: any;
  category: any;
  type: string;
}
export interface Basket {
  id: string;
  items: BasketItem[];
  clientSecret?: string;
  paymentIntentId?: string;
  deliveryMethodId?: number;
  shippingPrice: number;
}

export class Basket implements Basket {
  id = cuid();
  items: BasketItem[] = [];
  shippingPrice = 0;
}

export interface BasketTotals {
  shipping: number;
  subtotal: number;
  total: number;
}
