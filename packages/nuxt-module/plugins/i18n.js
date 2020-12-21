import Vue from "vue";
import VueI18n from "vue-i18n";
import Middleware from "./middleware";
import languagesMap from "sw-plugins/languages";
import domainsMap from "sw-plugins/domains";
import { exit } from "process";

const FALLBACK_DOMAIN = "/"; // Replace with configuration

Vue.use(VueI18n);

export default ({ app, store }) => {
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

/* Replace this middleware with a domain-centered middleware */
Middleware.i18n = function ({ isHMR, app, store, route, params, redirect }) {
  let domainGuess = `/${route.params.lang}`;

  const defaultLocale = app.i18n.fallbackLocale; // Should be renamed to domain
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return;
  }

  let domainConfig = domainsMap[domainGuess];

  if (domainConfig === undefined) {
    domainConfig = domainsMap[FALLBACK_DOMAIN];
  }

  let locale = domainConfig.languageLocaleCode;

  if (!languagesMap[locale]) {
    locale = defaultLocale;
    //   return error({ message: "This page could not be found.", statusCode: 404 });
  }

  const fromMap = languagesMap[locale];
  app.$shopwareApiInstance.update({ languageId: fromMap && fromMap.id });

  // Set locale
  store.commit("SET_LANG", locale);
  app.i18n.locale = locale;
};
