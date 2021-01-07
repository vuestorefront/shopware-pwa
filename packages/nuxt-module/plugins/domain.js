import { domain } from "process";
import Middleware from "./middleware";
const FALLBACK_DOMAIN = "<%= options.fallbackDomain %>";
const PWA_HOST = "<%= options.pwaHost %>";

export default ({ app, route }) => {
  const domainsList = require("sw-plugins/domains");
  app.domainsRouting = {
    availableDomains: domainsList,
    fallbackDomain: FALLBACK_DOMAIN,
    pwaHost: PWA_HOST,
  };
};

Middleware.domainsRouting = function ({ isHMR, app, store, route }) {
  if (isHMR) {
    return;
  }

  const domainConfig = route.meta;
  console.warn("domainConfig", domainConfig);

  if (domainConfig && domainConfig.length) {
    const configData = domainConfig[0];
    console.warn("domainConfig found ", configData.languageLocaleCode);
    app.$shopwareApiInstance.update({ languageId: configData.languageId });
    store.commit("SET_LANG", configData.languageLocaleCode);
    app.i18n.locale = configData.languageLocaleCode;
  }
};
