export interface CatalogueItem {
  code: string;
  name: string;
  price: number;
}

export interface BasketItem {
  code: string;
  name: string;
  price: number;
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
