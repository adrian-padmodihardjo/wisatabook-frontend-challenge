export default {
  target: 'static',
  head: {
    title: 'wisatabook',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
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
  ],
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
