import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    typescript: {
      config: (config) => ({
        ...config,
        compilerOptions: {
          ...config.compilerOptions,
          types: ['vitest/globals'],
        },
      }),
    },
  },
};

export default config;
