import {
  BLUE_WIDGET_CODE,
  BLUE_WIDGET_PRICE,
  GREEN_WIDGET_CODE,
  GREEN_WIDGET_PRICE,
  RED_WIDGET_CODE,
  RED_WIDGET_PRICE,
} from './data';
import type { CatalogueItem } from './types';

export const getCatalogue = async (): Promise<CatalogueItem[]> => {
  return [
    {
      code: RED_WIDGET_CODE,
      name: "Red Widget",
      price: RED_WIDGET_PRICE,
    },
    {
      code: GREEN_WIDGET_CODE,
      name: "Green Widget",
      price: GREEN_WIDGET_PRICE,
    },
    {
      code: BLUE_WIDGET_CODE,
      name: "Blue Widget",
      price: BLUE_WIDGET_PRICE,
    },
  ]
};
