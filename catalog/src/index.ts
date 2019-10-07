import { StorefrontModule } from "@vue-storefront/core/lib/modules";

export const CatalogShopwareModule: StorefrontModule = function(
  app,
  store,
  router,
  moduleConfig,
  appConfig
) {
  console.info("Shopware catalog module registered");
};
