export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxt/ui", "@nuxtjs/i18n"],
  ui: {
    global: true,
    icons: ["mdi", "simple-icons"],
  },
  i18n: {
    locales: [
      { code: "en", iso: "en-US", name: "English", file: "en.json" },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "lang/",
    strategy: "no_prefix",
    vueI18n: "./i18n.config.ts",
    detectBrowserLanguage: false,
  },
})
