import { onMounted, ref } from 'vue';

import { getCatalogue } from '@api/catalogue';
import { getPromotions } from '@api/promotions';
import { getShippingCosts } from '@api/shipping';
import type { CatalogueItem, Promotion, ShippingCost } from '@api/types';
import { createSharedComposable } from '@vueuse/core';

export const useApi = createSharedComposable(() => {
  const catalogue = ref<CatalogueItem[]>([]);
  const promotions = ref<Promotion[]>([]);
  const shippingRules = ref<ShippingCost[]>([]);

  onMounted(async () => {
    const [catalogueData, promotionsData, shippingData] = await Promise.all([
      getCatalogue(),
      getPromotions(),
      getShippingCosts(),
    ]);

    catalogue.value = catalogueData;
    promotions.value = promotionsData;
    shippingRules.value = shippingData;
  });

  return {
    catalogue,
    promotions,
    shippingRules,
  };
});
