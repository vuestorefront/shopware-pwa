import { extendNuxtConfig } from '@shopware-pwa/nuxt-module'

export default extendNuxtConfig({
  head: {
    title: 'shopware-pwa-project',
    meta: [{ hid: 'description', name: 'description', content: '' }],
  },
})
