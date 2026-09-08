export default defineNuxtConfig({
  ssr: false,
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui", "@nuxtjs/i18n"],
  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
    storageKey: "egmn-color-mode",
  },
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
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      meta: [
        { name: "theme-color", content: "#f7f5f0" },
        { property: "og:site_name", content: "egmn.dev" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://egmn.dev" },
        { name: "twitter:card", content: "summary" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "canonical", href: "https://egmn.dev" },
        {
          rel: "preload",
          as: "image",
          href: "/images/profile.webp",
          type: "image/webp",
          fetchpriority: "high",
        },
      ],
    },
  },
})
