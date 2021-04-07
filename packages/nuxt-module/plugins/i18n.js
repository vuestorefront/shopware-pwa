import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export default ({ app }, inject) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  const i18n = new VueI18n({
    locale: "en-GB",
    fallbackLocale: "<%= options.defaultLanguage %>",
    messages: {
      // <% options.availableLocales.forEach(function(availableLocale) { %>
      "<%= availableLocale %>": require("sw-plugins/locales/<%= availableLocale %>.json"),
      // <% }) %>
    },
  });

  app.i18n = i18n;
  inject("i18n", i18n);
};
