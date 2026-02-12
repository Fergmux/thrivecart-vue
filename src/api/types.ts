import type { ProductCode } from './data';

export interface CatalogueItem {
  code: ProductCode;
  name: string;
  price: number;
}

export interface BasketItem extends CatalogueItem {
  quantity: number;
}

export interface ShippingCost {
  minimumOrderValue: number;
  maximumOrderValue: number;
  shippingCost: number;
  hint?: string;
}

export interface Promotion {
  title: string;
}

export interface Discount {
  discount: number;
}

