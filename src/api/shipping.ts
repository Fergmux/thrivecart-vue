import type { ShippingCost } from './types';

export const getShippingCosts = async (): Promise<ShippingCost[]> => {
  return [
    {
      minimumOrderValue: 0,
      shippingCost: 4.95,
    },
    {
      minimumOrderValue: 50,
      shippingCost: 2.95,
    },
    {
      minimumOrderValue: 90,
      shippingCost: 0,
    },
  ]
};