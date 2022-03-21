import {
  ComputedRef,
  getCurrentInstance,
  getCurrentScope,
  UnwrapRef,
  inject,
} from "vue-demi";
import { ShopwareApiInstance } from "@shopware-pwa/shopware-6-client";
import { getContextProperty } from "./internalHelpers/getContextProperty";
import { ApiDefaults } from "@shopware-pwa/commons";
import { IInterceptorCallbackFunction } from "./logic/useIntercept";

/**
 * @beta
 */
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
 * Routing type for Shopware SEO path resolvers
 *
 * @beta
 */
export type SwRouting = {
  availableDomains: ShopwareDomain[];
  fallbackDomain?: string;
  fallbackLocale?: string;
  getCurrentDomain: ComputedRef<ShopwareDomain>;
  setCurrentDomain: (domainData: any) => void;
  getUrl: (path: string) => string;
  getAbsoluteUrl: (path: string) => string;
};

type SharedStore = UnwrapRef<{ [storeKey: string]: any }>;

/**
 * @beta
 */
export type SwInterceptor = {
  name: string;
  handler: IInterceptorCallbackFunction;
};

/**
 * @beta
 */
export type SwInterceptors = {
  [broadcastKey: string]: Array<SwInterceptor>;
};

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
  const injectedShopwareContext = injectedContext && inject("shopware", null);
  const shopwareContext =
    injectedShopwareContext || getContextProperty<any>(context, "shopware");
  if (!shopwareContext) {
    console.warn(`[${key}] Use createShopware method to setup composables.`);
  } else {
    return {
      apiInstance: shopwareContext.apiInstance,
      router: getContextProperty<any>(context, "router"),
      route: getContextProperty<any>(context, "route"),
      routing: getContextProperty<SwRouting>(context, "routing"),
      i18n: getContextProperty<any>(context, "i18n"),
      cookies: getContextProperty<any>(context, "cookies"),
      shopwareDefaults: shopwareContext.state.shopwareDefaults,
      interceptors: shopwareContext.state.interceptors,
      sharedStore: shopwareContext.state.sharedStore,
      devtools: shopwareContext.devtools,
      isServer: !!(
        getContextProperty<boolean>(context, "isServer") ||
        (typeof process !== "undefined" && !!(process as Process).server)
      ),
      contextName: key,
    };
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
