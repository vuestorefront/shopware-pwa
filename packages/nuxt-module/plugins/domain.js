import Middleware from "./middleware";
import { computed } from "@vue/composition-api";
import { useSessionContext, useSharedState } from "@shopware-pwa/composables";
const FALLBACK_DOMAIN = "<%= options.fallbackDomain %>" || "/";
const FALLBACK_LOCALE = "<%= options.fallbackLocale %>";
const PWA_HOST = "<%= options.pwaHost %>";
const domainsList = require("sw-plugins/domains");

// register domains based routing and configuration
export default ({ app, route }, inject) => {
  const { sharedRef } = useSharedState(app);
  const currentDomainData = sharedRef("sw-current-domain");

  const routeDomainUrl = computed(() => route.meta?.[0]?.url);
  const routeDomain = computed(() =>
    Object.values(domainsList).find(
      (domain) => domain.url === routeDomainUrl.value
    )
  );

  const getCurrentDomain = computed(
    () => currentDomainData.value || routeDomain.value
  );

  const getNormalizedDomainPath = computed(() =>
    getCurrentDomain.value && getCurrentDomain.value?.url !== "/"
      ? getCurrentDomain.value?.url
      : ""
  );

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
    getAbsoluteUrl: (path) =>
      `${PWA_HOST}${getNormalizedDomainPath.value}${path}`,
  };

  // set the domain for current route
  routing.setCurrentDomain(routeDomain.value);

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
      ({ url }) => url === FALLBACK_DOMAIN
    );
    // if the fallback domain does not match - use the first available instead
    const fallbackDomainPrefix =
      (fallbackDomainFound && fallbackDomainFound.url) ||
      app.routing.availableDomains.pop().url;
    return redirect(`${fallbackDomainPrefix}${route.path}`);
  }

  if (!domainConfig) {
    return;
  }

  // set default currency for the current domain
  const { setCurrency, currency } = useSessionContext(app);
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
};
