import {
  BLUE_WIDGET_CODE,
  GREEN_WIDGET_CODE,
  RED_WIDGET_CODE,
} from './data';

export type ProductCode =
  | typeof RED_WIDGET_CODE
  | typeof GREEN_WIDGET_CODE
  | typeof BLUE_WIDGET_CODE;
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

