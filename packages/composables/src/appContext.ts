import { ComputedRef, getCurrentInstance } from "@vue/composition-api";
import { ShopwareApiInstance } from "@shopware-pwa/shopware-6-client";
import { VueConstructor } from "vue";

/**
 * @beta
 */
export interface Routing {
  availableDomains: any;
  fallbackDomain: string | undefined;
  fallbackLocale: string | undefined;
  pwaHost: string | undefined;
  getCurrentDomain: ComputedRef<string>;
  setCurrentDomain: (domainData: any) => void;
  getUrl: (path: string) => string;
}

/**
 * Application Context for Shopware PWA. It's an extended Vue instance.
 *
 * @beta
 */
export interface ApplicationVueContext extends VueConstructor {
  $shopwareApiInstance?: ShopwareApiInstance;
  shopwareApiInstance?: ShopwareApiInstance;
  $routing: Routing;
  routing: Routing;
  $store?: any; // Vuex Store
  store?: any; // Vuex Store
  $route?: any; // Vue router
  $router?: any; // Vue router
  router?: any; // Vue router
  route?: any; // Vue router
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
    route: context?.$route || context?.route,
    i18n: context?.$i18n || context?.i18n,
    cookies: context?.$cookies || context?.cookies,
    shopwareDefaults: context?.$shopwareDefaults || context?.shopwareDefaults,
    interceptors: context?.$interceptors || context?.interceptors || {},
    routing: context?.$routing || context?.routing,
    contextName: key,
  };
}
