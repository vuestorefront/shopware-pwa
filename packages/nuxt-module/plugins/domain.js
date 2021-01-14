import Middleware from "./middleware";
import VueCompositionAPI, { computed, ref } from "@vue/composition-api";
import Vue from "vue";
const FALLBACK_DOMAIN = "<%= options.fallbackDomain %>";
const FALLBACK_LOCALE = "<%= options.fallbackLocale %>";
const PWA_HOST = "<%= options.pwaHost %>";
const domainsList = require("sw-plugins/domains");
Vue.use(VueCompositionAPI);

const currentDomainData = ref();
// register domains based routing and configuration
export default ({ app, route }, inject) => {
  const routeDomain = computed(() => route.meta?.[0]?.url);
  const domainFromRoute = computed(() =>
    Object.values(domainsList).find(
      (domain) => domain.url === routeDomain.value
    )
  );

  const routing = {
    // list of available domains from "domains.json" - output of "domains" CLI command
    availableDomains: Object.values(domainsList),
    fallbackDomain: FALLBACK_DOMAIN,
    fallbackLocale: FALLBACK_LOCALE,
    pwaHost: PWA_HOST,
    // set current domain's configuration
    setCurrentDomain: (domainData) => {
      currentDomainData.value = domainData;
    },
    // get current domain's configuration
    getCurrentDomain: () => {
      return currentDomainData.value || domainFromRoute.value;
    },
    // get route for current domain
    getUrl: (path) =>
      currentDomainData.value
        ? `${currentDomainData.value.url}${path}`.replace(/^\/\/+/, "/")
        : path,
  };

  // set the domain for current route
  routing.setCurrentDomain(domainFromRoute.value);

  // public plugin within the context
  app.routing = routing;
  inject("routing", routing);
};

// middleware to set languageId & currencyId for api client and i18n plugin
Middleware.routing = function ({ isHMR, app, store, route, redirect }) {
  if (isHMR) {
    return;
  }

  // a route can have multiple metadata objects inside - find the one with domainId - it comes from compiled routes (domains nuxt-module)
  const domainConfig =
    Array.isArray(route.meta) && route.meta.find((data) => !!data.domainId);

  // perform a redirection to the fallback domain if the current domain is not available
  // for example: /Toys -> /germany/Toys if the "/" domain is not present
  if (!domainConfig) {
    return redirect(`${FALLBACK_DOMAIN}${route.path}`);
  }

  const { currencyId, languageId, languageLocaleCode } = domainConfig;
  app.routing.setCurrentDomain(domainConfig);
  currencyId &&
    languageId &&
    app.$shopwareApiInstance.update({ currencyId, languageId });
  languageLocaleCode && store.commit("SET_LANG", languageLocaleCode);
  app.i18n.locale = languageLocaleCode;
};
