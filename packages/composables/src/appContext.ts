import { getCurrentInstance } from "@vue/composition-api";
import { ShopwareApiInstance } from "@shopware-pwa/shopware-6-client";
import { VueConstructor } from "vue";

/**
 * Applicatoin Context for Shopware PWA. It's an extended Vue instance.
 *
 * @beta
 */
export interface ApplicationVueContext extends VueConstructor {
  $shopwareApiInstance?: ShopwareApiInstance;
  shopwareApiInstance?: ShopwareApiInstance;
  $store?: any; // Vuex Store
  store?: any; // Vuex Store
  $router?: any; // Vue router
  router?: any; // Vue router
  $i18n?: any; // Vue i18n plugin
  i18n?: any; // Vue i18n plugin
  $cookies?: any; // cookie-universal
  cookies?: any; // cookie-universal
  shopwareDefaults?: any; // defaults for API
  $shopwareDefaults?: any; // defaults for API
  $interceptors?: any;
  interceptors?: any;
}

function checkAppContext(
  key: string,
  rootContext: ApplicationVueContext
): boolean {
  if (!rootContext?.$shopwareApiInstance && !rootContext?.shopwareApiInstance) {
    process.env.NODE_ENV !== "production" &&
      console.warn(
        `[SECURITY][${key}] Trying to access Application context without Vue instance context. See https://shopware-pwa-docs.vuestorefront.io/landing/fundamentals/security.html#context-awareness`
      );
    return false;
  }
  return true;
}

/**
 *
 * @beta
 */
export function getApplicationContext(
  rootContext: ApplicationVueContext,
  key: string = "getApplicationContext"
) {
  let context = rootContext;
  if (!checkAppContext(key, rootContext)) {
    context = getCurrentInstance() as any;
  }
  return {
    apiInstance: context?.$shopwareApiInstance || context?.shopwareApiInstance,
    vuexStore: context?.$store || context?.store,
    router: context?.$router || context?.router,
    i18n: context?.$i18n || context?.i18n,
    cookies: context?.$cookies || context?.cookies,
    shopwareDefaults: context?.$shopwareDefaults || context?.shopwareDefaults,
    interceptors: context?.$interceptors || context?.interceptors || {},
    contextName: key,
  };
}
