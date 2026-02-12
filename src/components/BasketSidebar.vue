<script setup lang="ts">
import { useBasket } from '@composables/useBasket';

import { colors, formatPrice } from './utils';

const {
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
} = useBasket();
</script>

<template>
  <aside class="space-y-4">
    <h2 class="text-lg font-semibold tracking-wide uppercase text-gray-400">
      Your Basket
      <span
        v-if="basketItemCount"
        class="ml-2 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold h-5 w-5"
      >
        {{ basketItemCount }}
      </span>
    </h2>

    <!-- Empty state -->
    <div
      v-if="basketItems.length === 0"
      class="rounded-2xl ring-1 ring-white/10 p-8 text-center text-gray-500 text-sm"
    >
      Your basket is empty. <br />
      Add some widgets!
    </div>

    <!-- Items -->
    <TransitionGroup name="list" tag="div" class="space-y-3">
      <div
        v-for="item in basketItems"
        :key="item.code"
        :class="[
          'rounded-xl ring-1 p-4 flex flex-col gap-3 transition-all',
          colors(item.code).bg,
          colors(item.code).ring,
        ]"
      >
        <!-- Row 1: colour dot + name + unit price + delete -->
        <div class="flex items-center gap-3 justify-between">
          <div class="flex items-center gap-2 min-w-0">
            <span
              :class="['inline-block h-6 w-6 rounded-full shrink-0', colors(item.code).badge]"
            />
            <p class="text-sm font-medium">{{ item.name }}</p>
          </div>
          <div class="flex items-center gap-2">
            <p class="text-xs text-gray-400">{{ formatPrice(item.price) }} each</p>
            <button
              class="h-6 w-6 rounded-md cursor-pointer bg-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/30 active:scale-90 transition"
              title="Remove all"
              @click="deleteFromBasket(item.code)"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Row 2: quantity controls + line total -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <button
              class="h-7 w-7 rounded-md cursor-pointer bg-white/10 text-sm font-bold hover:bg-white/20 active:scale-90 transition"
              @click="removeFromBasket(item.code)"
            >
              −
            </button>
            <span class="w-6 text-center text-sm font-semibold">{{ item.quantity }}</span>
            <button
              class="h-7 w-7 rounded-md cursor-pointer bg-white/10 text-sm font-bold hover:bg-white/20 active:scale-90 transition"
              @click="addToBasket(item)"
            >
              +
            </button>
          </div>

          <span :class="['text-sm font-bold', colors(item.code).text]">
            {{ formatPrice(item.price * item.quantity) }}
          </span>
        </div>
      </div>
    </TransitionGroup>

    <!-- ─── Summary ──────────────────────────────── -->
    <div
      v-if="basketItems.length"
      class="rounded-2xl ring-1 ring-white/10 bg-white/5 p-5 space-y-3 text-sm"
    >
      <div class="flex justify-between text-gray-400">
        <span>Subtotal</span>
        <span>{{ formatPrice(basketSubtotal) }}</span>
      </div>

      <div v-if="basketDiscount > 0" class="flex justify-between text-emerald-400">
        <span>Discount</span>
        <span>− {{ formatPrice(basketDiscount) }}</span>
      </div>

      <div class="flex justify-between text-gray-400">
        <span>Delivery</span>
        <span>{{ basketDelivery === 0 ? 'FREE' : formatPrice(basketDelivery) }}</span>
      </div>

      <hr class="border-white/10" />

      <div class="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>{{ formatPrice(basketTotal) }}</span>
      </div>

      <!-- Shipping tier hint -->
      <p v-if="basketDeliveryHint" class="text-[11px] text-emerald-400 leading-tight">
        {{ basketDeliveryHint }}
      </p>
    </div>
  </aside>
</template>

<style scoped>
/* TransitionGroup animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
