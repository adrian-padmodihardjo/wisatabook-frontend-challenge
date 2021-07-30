export default {
  target: 'static',
  head: {
    title: 'Wisatabook: Book Secret Hotel, Apartment & Villa Deals',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Wisatabook is the best place to book secret hotel deals. Save time and money with our incredible member-only prices.' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  components: false,
  css: [
    '@/assets/stylesheet/preflight.scss',
  ],
  plugins: [
    '@/plugins/theme.js',
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/pwa',
  ],
  pwa: {
    dev: true,
    manifest: {
      name: 'Exterior',
      short_name: 'Exterior',
      lang: 'en',
      description: '',
    },
  },
  build: {
    extend (config) {
      const svgRule = config.module.rules.find((rule) => {
        return rule.test.test('.svg')
      })

      const defaultRule = [...svgRule.use]
      delete svgRule.use

      svgRule.oneOf = [
        {
          resourceQuery: /vue/,
          use: [
            'vue-loader',
            'svg-to-vue-component/loader',
          ],
        },
        ...defaultRule,
      ]
    },
  },
}
