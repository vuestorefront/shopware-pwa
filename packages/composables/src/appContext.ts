import {
  ComputedRef,
  getCurrentInstance,
  getCurrentScope,
  UnwrapRef,
} from "vue-demi";
import { ShopwareApiInstance } from "@shopware-pwa/shopware-6-client";
import { getContextProperty } from "./internalHelpers/getContextProperty";
import { ApiDefaults } from "@shopware-pwa/commons";
import { IInterceptorCallbackFunction } from "./logic/useIntercept";

export interface ShopwareDomain {
  url: string;
  origin: string;
  host: string;
  pathPrefix: string;
  domainId: string;
  currencyId: string;
  snippetSetId: string;
  languageId: string;
  languageName: string;
  languageLabel: string;
  languageLocaleCode: string;
}

/**
 * @beta
 * @deprecated use type SwRouting instead
 */
export interface Routing {
  availableDomains: ShopwareDomain[];
  fallbackDomain: string | undefined;
  fallbackLocale: string | undefined;
  getCurrentDomain: ComputedRef<ShopwareDomain>;
  setCurrentDomain: (domainData: any) => void;
  getUrl: (path: string) => string;
}

/**
 * Routing type for Shopware SEO path resolvers.
 *
 * @beta
 */
export type SwRouting = Routing;

type SharedStore = UnwrapRef<{ [storeKey: string]: any }>;

/**
 * @beta
 */
export type SwInterceptors = {
  [broadcastKey: string]: Array<IInterceptorCallbackFunction>;
};

function checkAppContext(key: string, rootContext: any): boolean {
  if (!rootContext?.$shopwareApiInstance && !rootContext?.shopwareApiInstance) {
    process.env.NODE_ENV !== "production" &&
      console.warn(
        `[SECURITY][${key}] Trying to access Application context without Vue instance context. See https://shopware-pwa-docs.vuestorefront.io/landing/fundamentals/security.html#context-awareness`
      );
    return false;
  }
  if (rootContext.$store || rootContext.store) {
    process.env.NODE_ENV !== "production" &&
      console.warn(
        `[PERFORMANCE][${key}] Vuex store detected. Remove "store" directory and useSharedState instead.`
      );
  }
  return true;
}

interface Process extends NodeJS.Process {
  server: boolean;
}

/**
 * Get the current application context values. The context is either a scope or a component instance.
 * This method checks if the context contains all the necessary data.
 *
 * This method will likely change in future in order to provide full Vue3 compability.
 *
 * @beta
 */
export function getApplicationContext(params?: { contextName?: string }) {
  const key = params?.contextName || "getApplicationContext";
  const injectedContext = getCurrentInstance()?.proxy as any;
  const scopeContext = (getCurrentScope?.() as any)?.vm;
  let context = scopeContext || injectedContext;
  if (!checkAppContext(key, context)) {
    console.error(`[${key}] No Vue instance detected!`);
  }

  return {
    apiInstance: getContextProperty<ShopwareApiInstance>(
      context,
      "shopwareApiInstance"
    ),
    router: getContextProperty<any>(context, "router"),
    route: getContextProperty<any>(context, "route"),
    routing: getContextProperty<SwRouting>(context, "routing"),
    i18n: getContextProperty<any>(context, "i18n"),
    cookies: getContextProperty<any>(context, "cookies"),
    shopwareDefaults: getContextProperty<ApiDefaults>(
      context,
      "shopwareDefaults"
    ),
    interceptors: getContextProperty<SwInterceptors>(context, "interceptors"),
    sharedStore: getContextProperty<SharedStore>(context, "sharedStore"),
    isServer: !!(
      getContextProperty<boolean>(context, "isServer") ||
      (typeof process !== "undefined" && !!(process as Process).server)
    ),
    contextName: key,
  };
}
