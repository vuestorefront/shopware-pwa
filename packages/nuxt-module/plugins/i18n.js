import Vue from "vue";
import VueI18n from "vue-i18n";
import Middleware from "./middleware";
import languagesMap from "sw-plugins/languages";
import domainsMap from "sw-plugins/domains";
import { useDomains } from "@shopware-pwa/composables";

const FALLBACK_DOMAIN = "/"; // Replace with configuration

Vue.use(VueI18n);

export default ({ app, store }) => {
  const { currentDomain, availableDomains } = useDomains(app);
  // console.warn('availableDomains', availableDomains.value);
  // console.warn('current domain', currentDomain.value)
  // console.warn('from i18n', app.domainsRouting)
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: "<%= options.defaultLanguage %>",
    messages: {
      // <% options.availableLocales.forEach(function(availableLocale) { %>
      "<%= availableLocale %>": require("sw-plugins/locales/<%= availableLocale %>.json"),
      // <% }) %>
    },
  });

  app.i18n.reverseLookup = (locale) => {
    let domain = FALLBACK_DOMAIN;

    for (const [url, domainConfig] of Object.entries(domainsMap)) {
      if (domainConfig.languageLocaleCode === app.i18n.locale) {
        domain = domainConfig;
        break;
      }
    }

    return domain;
  };

  // Method to be used in nuxt-link
  app.i18n.path = (link) => {
    let domain = app.i18n.reverseLookup(app.i18n.locale);

    if (domain.url === "/") {
      return `${link}`;
    }

    return `${domain}${link}`;
  };
};
