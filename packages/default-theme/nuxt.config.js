import path from 'path'

const coreDevelopment = true
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/api-client'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    [
      '@vue-storefront/nuxt',
      {
        coreDevelopment,
        useRawSource: {
          dev: coreDevelopment
            ? [
                '@shopware-pwa/shopware-6-client',
                '@shopware-pwa/composables',
                '@shopware-pwa/helpers'
              ]
            : [],
          prod: [
            '@shopware-pwa/shopware-6-client',
            '@shopware-pwa/composables',
            '@shopware-pwa/helpers'
          ]
        }
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'cookie-universal-nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias['@storefront-ui/vue'] = path.resolve(
        'node_modules/@storefront-ui/vue'
      )
      config.resolve.alias['@storefront-ui/shared'] = path.resolve(
        'node_modules/@storefront-ui/shared'
      )
      if (ctx.isClient && !ctx.isDev) {
        config.optimization.splitChunks.cacheGroups.commons.minChunks = 2
      }
    }
  }
}
