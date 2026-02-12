import {
  computed,
  type ComputedRef,
  ref,
  type Ref,
  watch,
} from 'vue';

import { calculatePromotions } from '@api/promotions';
import type {
  BasketItem,
  CatalogueItem,
  ProductCode,
  ShippingCost,
} from '@api/types';
import { createSharedComposable } from '@vueuse/core';

import { useApi } from './useApi';

export interface UseBasketReturn {
  basketItems: Ref<BasketItem[]>;
  addToBasket: (product: CatalogueItem) => void;
  removeFromBasket: (code: ProductCode) => void;
  deleteFromBasket: (code: ProductCode) => void;
  basketItemCount: ComputedRef<number>;
  basketSubtotal: ComputedRef<number>;
  basketDiscount: Ref<number>;
  basketDelivery: ComputedRef<number>;
  basketDeliveryHint: ComputedRef<string | null>;
  basketTotal: ComputedRef<number>;
}

export const useBasket = createSharedComposable((): UseBasketReturn => {
  const { shippingRules } = useApi();

  const basketItems = ref<BasketItem[]>([]);

  function addToBasket(product: CatalogueItem): void {
    const existing = basketItems.value.find((i) => i.code === product.code);
    if (existing) {
      existing.quantity++;
      return;
    }
    basketItems.value.push({ ...product, quantity: 1 });
  }

  function removeFromBasket(code: ProductCode): void {
    const idx = basketItems.value.findIndex((i) => i.code === code);
    if (idx === -1) return;
    const item = basketItems.value[idx];
    if (item && item.quantity > 1) {
      item.quantity--;
    } else {
      basketItems.value.splice(idx, 1);
    }
  }

  function deleteFromBasket(code: ProductCode): void {
    const idx = basketItems.value.findIndex((i) => i.code === code);
    if (idx !== -1) basketItems.value.splice(idx, 1);
  }

  const basketItemCount = computed<number>(() =>
    basketItems.value.reduce((sum, i) => sum + i.quantity, 0),
  );

  const basketSubtotal = computed<number>(() =>
    basketItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  const basketDiscount = ref(0);

  watch(
    basketItems,
    async (current) => {
      const flat: BasketItem[] = current.flatMap((item) =>
        Array.from({ length: item.quantity }, () => ({ ...item, quantity: 1 })),
      );
      const result = await calculatePromotions(flat);
      basketDiscount.value = result?.discount ?? 0;
    },
    { deep: true },
  );

  const currentShippingRule = computed<ShippingCost | null>(() => {
    if (basketItems.value.length === 0) return null;
    const orderValue = basketSubtotal.value - basketDiscount.value;
    return (
      shippingRules.value.find(
        (r) => orderValue >= r.minimumOrderValue && orderValue < r.maximumOrderValue,
      ) ?? null
    );
  });

  const basketDelivery = computed<number>(() => currentShippingRule.value?.shippingCost ?? 0);

  const basketDeliveryHint = computed<string | null>(() => currentShippingRule.value?.hint ?? null);

  const basketTotal = computed<number>(
    () => basketSubtotal.value - basketDiscount.value + basketDelivery.value,
  );

  return {
    basketItems,
    addToBasket,
    removeFromBasket,
    deleteFromBasket,
    basketItemCount,
    basketSubtotal,
    basketDiscount,
    basketDelivery,
    basketDeliveryHint,
    basketTotal,
  };
});
