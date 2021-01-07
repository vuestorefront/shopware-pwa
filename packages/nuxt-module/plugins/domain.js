import Middleware from "./middleware";
const FALLBACK_DOMAIN = "<%= options.fallbackDomain %>";
const PWA_HOST = "<%= options.pwaHost %>";

export default ({ app, route }, inject) => {
  const domainsList = require("sw-plugins/domains");
  const currentDomain = Object.values(domainsList).find(
    (domain) => domain.url === route.meta?.[0]?.url
  );
  const domainsRouting = {
    availableDomains: domainsList,
    fallbackDomain: FALLBACK_DOMAIN,
    pwaHost: PWA_HOST,
    getCurrentDomain: () => currentDomain,
  };
  app.domainsRouting = domainsRouting;
  inject("domainsRouting", domainsRouting);
};

Middleware.domainsRouting = function ({ isHMR, app, store, route }) {
  if (isHMR) {
    return;
  }

  const domainConfig = route.meta;

  if (domainConfig && domainConfig.length) {
    const configData = domainConfig[0];
    app.$shopwareApiInstance.update({ languageId: configData.languageId });
    store.commit("SET_LANG", configData.languageLocaleCode);
    app.i18n.locale = configData.languageLocaleCode;
  }
};
