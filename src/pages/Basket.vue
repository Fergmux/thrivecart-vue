<script setup lang="ts">
import BasketSidebar from '@components/BasketSidebar.vue';
import ProductCatalogue from '@components/ProductCatalogue.vue';
</script>

<template>
  <div class="min-h-screen w-full py-10 px-4">
    <div class="max-w-5xl mx-auto space-y-10">
      <!-- Header -->
      <header class="text-center space-y-2">
        <h1 class="text-4xl font-bold tracking-tight">🛒 Widget Store</h1>
        <p class="text-gray-400 text-sm">Pick your widgets, we'll handle the rest.</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ProductCatalogue />
        <BasketSidebar />
      </div>
    </div>
  </div>
</template>
