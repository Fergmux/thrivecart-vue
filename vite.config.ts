import path from 'node:path';

import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@composables': path.resolve(__dirname, 'src/composables'),
      '@api': path.resolve(__dirname, 'src/api'),
    },
  },
});
