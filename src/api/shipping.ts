import type { ShippingCost } from './types';

export const getShippingCosts = async (): Promise<ShippingCost[]> => {
  return [
    {
      minimumOrderValue: 0,
      maximumOrderValue: 5000,
      shippingCost: 495,
      hint: 'Spend over £50 to reduce delivery to £2.95',
    },
    {
      minimumOrderValue: 5000,
      maximumOrderValue: 9000,
      shippingCost: 295,
      hint: 'Spend over £90 for free delivery!',
    },
    {
      minimumOrderValue: 9000,
      maximumOrderValue: Infinity,
      shippingCost: 0,
    },
  ];
};
