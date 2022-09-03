import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  shim: false,
  css: ['/assets/css/style.css', '/assets/css/anim.css'],  // 载入全局css
  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        // <link rel="stylesheet" href="https://myawesome-lib.css">
        { rel: 'icon', href: 'https://www.mihoyo.com/favicon.ico' }
      ],
      title: "米哈游-TECH OTAKUS SAVE THE WORLD"
    }
  },
  nitro: {
    prerender: { crawlLinks: false, routes: [] }
  },
  asyncEntry: true,

})
