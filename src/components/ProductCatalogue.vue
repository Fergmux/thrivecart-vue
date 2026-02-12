<script setup lang="ts">
import { useApi } from '@composables/useApi';
import { useBasket } from '@composables/useBasket';

import { colors, formatPrice } from './utils';

const { catalogue, promotions } = useApi();
const { addToBasket } = useBasket();
</script>

<template>
  <section class="lg:col-span-2 space-y-4">
    <h2 class="text-lg font-semibold tracking-wide uppercase text-gray-400">Catalogue</h2>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="product in catalogue"
        :key="product.code"
        :class="[
          'rounded-2xl p-5 ring-1 flex flex-col items-center gap-3 transition-all hover:scale-[1.03]',
          colors(product.code).bg,
          colors(product.code).ring,
        ]"
      >
        <span
          :class="['inline-block h-10 w-10 rounded-full shadow-lg', colors(product.code).badge]"
        />
        <span class="font-semibold text-base">{{ product.name }}</span>
        <span :class="['text-xl font-bold', colors(product.code).text]">
          {{ formatPrice(product.price) }}
        </span>
        <span class="text-[11px] text-gray-500 font-mono">{{ product.code }}</span>

        <button
          class="mt-auto w-full cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/20 active:scale-95"
          @click="addToBasket(product)"
        >
          Add to basket
        </button>
      </div>
    </div>

    <!-- ─── Active Offers ─────────────────────────── -->
    <div
      v-if="promotions.length"
      class="mt-6 rounded-xl bg-amber-500/10 ring-1 ring-amber-500/30 p-4 space-y-1"
    >
      <h3 class="text-sm font-semibold text-amber-400 uppercase tracking-wide">Active Offers</h3>
      <ul class="list-disc list-inside text-sm text-amber-200/80">
        <li v-for="(promo, idx) in promotions" :key="idx">{{ promo.title }}</li>
      </ul>
    </div>
  </section>
</template>
