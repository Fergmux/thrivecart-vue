import { computed, ref, watch } from 'vue';

import { calculatePromotions } from '@api/promotions';
import type { BasketItem, CatalogueItem } from '@api/types';
import { createSharedComposable } from '@vueuse/core';

import { useApi } from './useApi';

export const useBasket = createSharedComposable(() => {
  const { shippingRules } = useApi();

  const basketItems = ref<BasketItem[]>([]);

  // ── Add method ──────────────────────────────────────────
  function addToBasket(product: CatalogueItem) {
    const existing = basketItems.value.find((i) => i.code === product.code);
    if (existing) {
      existing.quantity++;
      return;
    }
    basketItems.value.push({ ...product, quantity: 1 });
  }

  // ── Remove method ───────────────────────────────────────
  function removeFromBasket(code: string) {
    const idx = basketItems.value.findIndex((i) => i.code === code);
    if (idx === -1) return;
    const item = basketItems.value[idx];
    if (item && item.quantity > 1) {
      item.quantity--;
    } else {
      basketItems.value.splice(idx, 1);
    }
  }

  // ── Delete all of a product ────────────────────────────
  function deleteFromBasket(code: string) {
    const idx = basketItems.value.findIndex((i) => i.code === code);
    if (idx !== -1) basketItems.value.splice(idx, 1);
  }

  // ── Derived values ──────────────────────────────────────
  const basketItemCount = computed(() => basketItems.value.reduce((sum, i) => sum + i.quantity, 0));

  const basketSubtotal = computed(() =>
    basketItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  // ── Discount (async) ────────────────────────────────────
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

  // ── Delivery ────────────────────────────────────────────
  const currentShippingRule = computed(() => {
    if (basketItems.value.length === 0) return null;
    const orderValue = basketSubtotal.value - basketDiscount.value;
    return (
      shippingRules.value.find(
        (r) => orderValue >= r.minimumOrderValue && orderValue < r.maximumOrderValue,
      ) ?? null
    );
  });

  const basketDelivery = computed(() => currentShippingRule.value?.shippingCost ?? 0);

  const basketDeliveryHint = computed(() => currentShippingRule.value?.hint ?? null);

  // ── Total ───────────────────────────────────────────────
  const basketTotal = computed(
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
