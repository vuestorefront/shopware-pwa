import Middleware from "./middleware";
import { computed } from "vue-demi";
import { useSessionContext, useSharedState } from "@shopware-pwa/composables";
const FALLBACK_DOMAIN = "<%= options.fallbackDomain %>" || "/";
const FALLBACK_LOCALE = "<%= options.fallbackLocale %>";
const PWA_HOST = "<%= options.pwaHost %>";
const SHOPWARE_DOMAINS_ALLOW_LIST = "<%= options.shopwareDomainsAllowList %>";
const domains = require("sw-plugins/domains");
const domainsList = Object.values(domains).filter(
  ({ url }) => SHOPWARE_DOMAINS_ALLOW_LIST?.includes(url) // TODO: possibly problematic with prefix paths
);

// register domains based routing and configuration
export default ({ app, route, req }, inject) => {
  const { sharedRef } = useSharedState(app);
  const currentDomainData = sharedRef("sw-current-domain");

  const routeDomainUrl = computed(() => route.meta?.[0]?.pathPrefix);
  const routeDomain = computed(() =>
    Object.values(domainsList).find(
      (domain) => domain.pathPrefix === routeDomainUrl.value
    )
  );

  const getCurrentDomain = computed(
    () => currentDomainData.value || routeDomain.value
  );

  const getNormalizedDomainPath = computed(() =>
    getCurrentDomain.value && getCurrentDomain.value?.pathPrefix !== "/"
      ? getCurrentDomain.value?.pathPrefix
      : ""
  );

  const getDomainConfigFromRequest = (req) => {
    let hostname;
    let pathname;

    if (process.client) {
      hostname = window.location.hostname;
      pathname = window.location.pathname;
    } else {
      const detectedHost = req.headers["x-forwarded-host"] || req.headers.host;
      hostname = Array.isArray(detectedHost) ? detectedHost[0] : detectedHost;
      pathname = req.originalUrl;
    }

    if (hostname) {
      // first check the domains with prefix path as they are more specific than ones with just a hostname
      let matchingDomainConfig = domainsList
        .filter((domain) => domain.pathPrefix !== "/")
        .find((domain) => {
          const pathnameWithTrailingSlash = pathname + "/";
          /* add trailing slash also to the comparison to be completely safe
           * example: pathPrefix "/en" would otherwise also match /endless
           */
          const pathPrefixPartOfPathname = pathnameWithTrailingSlash.startsWith(
            domain.pathPrefix + "/"
          );
          return pathPrefixPartOfPathname && domain.host === hostname;
        });

      if (matchingDomainConfig) return matchingDomainConfig;
      // if there wasn't a match already, check the domains that only have a hostname
      matchingDomainConfig = domainsList
        .filter((domain) => domain.pathPrefix === "/")
        .find((domain) => {
          return domain.host === hostname;
        });

      if (matchingDomainConfig) return matchingDomainConfig;
    }
  };

  const routing = {
    // list of available domains from "domains.json" - output of "domains" CLI command
    availableDomains: (domainsList && Object.values(domainsList)) || {},
    fallbackDomain: FALLBACK_DOMAIN,
    fallbackLocale: FALLBACK_LOCALE,
    pwaHost: PWA_HOST,
    // set current domain's configuration
    setCurrentDomain: (domainData) => {
      currentDomainData.value = domainData;
    },
    // get current domain's configuration
    getCurrentDomain,
    // get route for current domain
    getUrl: (path) => {
      if (!path) {
        return "";
      }
      return getNormalizedDomainPath.value
        ? `${getNormalizedDomainPath.value}${path}`.replace(/^\/\/+/, "/")
        : path;
    },
    // get absolute url for current domain
    getAbsoluteUrl: (path) => {
      return `${currentDomainData.value.url}${path}`;
    },
  };

  const currentDomainConfig = getDomainConfigFromRequest(req);
  routing.setCurrentDomain(currentDomainConfig);

  // public plugin within the context
  app.routing = routing;
  inject("routing", routing);
};

// middleware to set languageId & currencyId for api client and i18n plugin
Middleware.routing = function ({ isHMR, app, from, route, redirect }) {
  if (isHMR) {
    return;
  }

  // a route can have multiple metadata objects inside - find the one with domainId - it comes from compiled routes (domains nuxt-module)
  const domainConfig =
    Array.isArray(route.meta) && route.meta.find((data) => !!data.domainId);

  // perform a redirection to the fallback domain if the current domain is not available
  // for example: /Toys -> /germany/Toys if the "/" domain is not present
  if (!domainConfig && app.routing.availableDomains.length) {
    const fallbackDomainFound = app.routing.availableDomains.find(
      ({ pathPrefix }) => pathPrefix === FALLBACK_DOMAIN
    );
    // if the fallback domain does not match - use the first available instead
    const fallbackDomainPrefix =
      (fallbackDomainFound && fallbackDomainFound.pathPrefix) ||
      app.routing.availableDomains.pop().pathPrefix;
    return redirect(`${fallbackDomainPrefix}${route.path}`);
  }

  if (!domainConfig) {
    return;
  }

  if (process.client) {
    const { languageId, languageLocaleCode } = domainConfig;
    app.routing.setCurrentDomain(domainConfig);
    languageId && app.$shopwareApiInstance.update({ languageId });
    app.i18n.locale = languageLocaleCode;
  }

  const { setup } = app;
  app.setup = function (...args) {
    let result = {};
    if (setup instanceof Function) {
      result = setup(...args) || {};
    }
    // set default currency for the current domain
    const { setCurrency, currency } = useSessionContext();
    let currencyId =
      route.query.currencyId ||
      (currency.value && currency.value.id) ||
      domainConfig.currencyId;
    // force change the currencyId to default one for changed domain
    const fromDomain =
      from &&
      Array.isArray(from.meta) &&
      from.meta.find((data) => !!data.domainId);
    if (fromDomain && fromDomain.domainId !== domainConfig.domainId) {
      currencyId = domainConfig.currencyId;
    }

    const currencyPromise = setCurrency({ id: currencyId });
    const { languageId, languageLocaleCode } = domainConfig;
    app.routing.setCurrentDomain(domainConfig);
    languageId && app.$shopwareApiInstance.update({ languageId });
    app.i18n.locale = languageLocaleCode;

    Promise.all([currencyPromise]).catch((e) => {
      console.error("[MIDDLEWARE][DOMAINS]", e);
    });
    return result;
  };
};
