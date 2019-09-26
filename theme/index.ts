
import App from './App.vue'
import routes from './router'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'
import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import { registerModule } from '@vue-storefront/core/lib/modules'
import { CatalogShopwareModule } from 'vsf-shopware-catalog/src'

const themeEntry: any = App

function initTheme (app, router, store, config, ssrContext) {
  registerModule(CatalogShopwareModule)
  setupMultistoreRoutes(config, router, routes)
  RouterManager.addRoutes(routes, router)
}

export {
  themeEntry,
  initTheme
}
