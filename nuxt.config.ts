// https://nuxt.com/docs/api/configuration/nuxt-config
import { posts } from './data/profile'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  css: ['~/assets/css/main.css'],

  // Fully prerendered: every route ships as static HTML whether the host runs `nuxt build` or `nuxt generate`.
  routeRules: {
    '/**': { prerender: true },
    // /writing 404s until the first post exists, so it is only prerendered once there is one.
    '/writing': { prerender: posts.length > 0 },
    '/sitemap.xml': { headers: { 'content-type': 'application/xml; charset=utf-8' } },
  },

  features: {
    inlineStyles: true,
  },

  experimental: {
    // Nothing on the page is data-driven at runtime, so skip the extra _payload.json requests.
    payloadExtraction: false,
  },

  compatibilityDate: '2025-07-15',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml'],
      failOnError: true,
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
