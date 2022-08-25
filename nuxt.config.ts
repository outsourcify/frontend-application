import { defineNuxtConfig } from 'nuxt';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,

  nitro: {
    preset: 'node-server',
  },

  app: {
    head: {
      titleTemplate: '%s - Agency',
      title: 'Home',
    },
  },

  css: [
    'primevue/resources/themes/tailwind-light/theme.css',
    // "primevue/resources/themes/lara-light-indigo/theme.css",
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    '~/assets/css/primevue/index.css',
  ],

  // components: https://go.nuxtjs.dev/config-components
  components: [{ path: '~/components', pathPrefix: false }],

  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  build: {
    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining'],
    },
  },

  webpack: {
    postcss: {
      postcssOptions: {
        plugins: {
          'postcss-nested': {},
          'postcss-hexrgba': {},
          'postcss-import': {},
        },
      },
    },
  },

  vite: {
    // fixed issue ws: https://github.com/nuxt/framework/issues/1796#issuecomment-965577597
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
    plugins: [
      Components({
        resolvers: [
          PrimeVueResolver({
            // prefix for components (e.g. 'P' to resolve Menu from PMenu)
            prefix: 'P',
          }),
        ],
      }),
    ],
  },

  // https://v3.nuxtjs.org/guide/features/runtime-config/
  runtimeConfig: {
    public: {
      apiBase: 'https://phpstack-823281-2829821.cloudwaysapps.com', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
  },
});
