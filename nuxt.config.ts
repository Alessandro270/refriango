// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-echarts"],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  echarts: {
    charts: ["BarChart"],
    components: ["DatasetComponent", "GridComponent", "TooltipComponent"],
  },

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
