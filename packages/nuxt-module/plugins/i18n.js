import Vue from "vue";
import VueI18n from "vue-i18n";
import Middleware from "./middleware";
import { update } from "@shopware-pwa/shopware-6-client";
import languagesMap from "sw-plugins/languages";

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

  // Method to be used in nuxt-link
  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `${link}`;
    }
    return `/${app.i18n.locale}${link}`;
  };
};

Middleware.i18n = function ({ isHMR, app, store, route, params, redirect }) {
  const defaultLocale = app.i18n.fallbackLocale;
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return;
  }
  // Get locale from params
  let locale = params.lang || defaultLocale;
  if (!languagesMap[locale]) {
    locale = defaultLocale;
    //   return error({ message: "This page could not be found.", statusCode: 404 });
  }

  const fromMap = languagesMap[locale];
  update({ languageId: fromMap && fromMap.id });

  // Set locale
  store.commit("SET_LANG", locale);
  app.i18n.locale = locale;
  // If route is /<defaultLocale>/... -> redirect to /...
  if (
    locale === defaultLocale &&
    route.fullPath.indexOf("/" + defaultLocale) === 0
  ) {
    const toReplace =
      "^/" +
      defaultLocale +
      (route.fullPath.indexOf("/" + defaultLocale + "/") === 0 ? "/" : "");
    const re = new RegExp(toReplace);
    return redirect(route.fullPath.replace(re, "/"));
  }
};
