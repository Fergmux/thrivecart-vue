import {
  RED_WIDGET_CODE,
  RED_WIDGET_PRICE,
} from './data';
import type {
  BasketItem,
  Discount,
  Promotion,
} from './types';

export const getPromotions = async (): Promise<Promotion[]> => {
  return [
    {
      title: "Buy one Red Widget get one half price",
    },
  ]
}
export const calculatePromotions = async (basket: BasketItem[]): Promise<Discount | undefined> => {
  // Update this if we allow the offer for more than 2 red widgets
  if (basket.filter(item => item.code === RED_WIDGET_CODE).length >= 2) {
    return {
      discount: RED_WIDGET_PRICE * 0.5,
    }
  }
  return undefined;
};