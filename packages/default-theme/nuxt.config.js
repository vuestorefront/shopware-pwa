import execa from 'execa'
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
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
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
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt'
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
    extend(config, { isDev, isClient }) {
      if (isClient && !isDev) {
        config.optimization.splitChunks.cacheGroups.commons.minChunks = 2
      }
    }
  },
  hooks: {
    build: {
      async before(builder, options) {
        const projectRootDir = path.resolve(__dirname, '../../')
        // const nodeMOdulesDir = `${projectRootDir}node_modules`
        // const extraFilePath = path.join(builder.nuxt.options.buildDir, 'extra-file')
        // fs.writeFileSync(extraFilePath, 'Something extra')
        console.error('--> Start building from hook!')
        // await execa('ls', ['-l'], {
        //   stdio: 'inherit',
        //   cwd: nodeMOdulesDir
        // })

        await execa('node', ['-v'], {
          stdio: 'inherit'
        })
        await execa(
          'yarn',
          [
            'add',
            '-D',
            '-W',
            'fs-extra',
            'execa',
            'chalk',
            'brotli',
            'zlib',
            'minimist',
            'rollup',
            'rollup-plugin-alias',
            'rollup-plugin-json',
            'rollup-plugin-peer-deps-external',
            'rollup-plugin-replace',
            'rollup-plugin-terser',
            'rollup-plugin-typescript2',
            '@vue/composition-api',
            'vue'
          ],
          {
            stdio: 'inherit',
            cwd: projectRootDir
          }
        )
        await execa('yarn', ['build'], {
          stdio: 'inherit',
          cwd: projectRootDir
        })
      }
    }
  }
}
