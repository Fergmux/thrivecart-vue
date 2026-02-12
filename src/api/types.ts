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
  shippingCost: number;
}

export interface Promotion {
  title: string;
}

export interface Discount {
  discount: number;
}