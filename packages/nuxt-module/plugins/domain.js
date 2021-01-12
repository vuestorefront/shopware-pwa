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

  const domainsRouting = {
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
    getRouteUrl: (path) =>
      currentDomainData.value
        ? `${currentDomainData.value.url}${path}`.replace(/^\/\/+/, "/")
        : path,
  };

  // set the domain for current route
  domainsRouting.setCurrentDomain(domainFromRoute.value);

  // public plugin within the context
  app.domainsRouting = domainsRouting;
  inject("domainsRouting", domainsRouting);
};

// middleware to set languageId & currencyId for api client and i18n plugin
Middleware.domainsRouting = function ({ isHMR, app, store, route }) {
  if (isHMR) {
    return;
  }

  // a route can have multiple metadata objects inside - find the one with domainId - it comes from compiled routes (domains nuxt-module)
  const domainConfig =
    Array.isArray(route.meta) && route.meta.find((data) => !!data.domainId);

  if (domainConfig) {
    const { currencyId, languageId, languageLocaleCode } = domainConfig;
    app.domainsRouting.setCurrentDomain(domainConfig);
    currencyId &&
      languageId &&
      app.$shopwareApiInstance.update({ currencyId, languageId });
    languageLocaleCode && store.commit("SET_LANG", languageLocaleCode);
    app.i18n.locale = languageLocaleCode;
  }
};
