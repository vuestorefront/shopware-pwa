import { shopwareSymbol, registerShopwareDevtools } from "./plugin";

/* istanbul ignore next */
/**
 *
 * @beta
 */
export const ShopwareVuePlugin = function (
  _Vue: any,
  pluginOptions: {
    enableDevtools: boolean;
  }
) {
  // app.config.globalProperties.$shopware = shopware

  _Vue.mixin({
    beforeCreate() {
      const options = this.$options;
      if (options.shopware) {
        const shopware = options.shopware as any;
        // HACK: taken from provide(): https://github.com/vuejs/composition-api/blob/master/src/apis/inject.ts#L30
        /* istanbul ignore else */
        if (!(this as any)._provided) {
          const provideCache = {};
          Object.defineProperty(this, "_provided", {
            get: () => provideCache,
            set: (v) => Object.assign(provideCache, v),
          });
        }
        (this as any)._provided[shopwareSymbol as any] = shopware;

        // propagate the shopware instance in an SSR friendly way
        // avoid adding it to nuxt twice
        /* istanbul ignore else */
        if (!this.$shopware) {
          this.$shopware = shopware;
        }

        shopware._a = this as any;
        if (pluginOptions?.enableDevtools && typeof window !== "undefined") {
          const devtools = registerShopwareDevtools(shopware._a, shopware);
          shopware.devtools = devtools;
        }
      } else if (
        !this.$shopware &&
        options.parent &&
        options.parent.$shopware
      ) {
        this.$shopware = options.parent.$shopware;
      }
    },
  });
};
