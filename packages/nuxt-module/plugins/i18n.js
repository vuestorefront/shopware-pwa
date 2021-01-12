import Vue from "vue";
import VueI18n from "vue-i18n";
import { useDomains } from "@shopware-pwa/composables";

Vue.use(VueI18n);

export default ({ app, store }) => {
  const { currentDomain, availableDomains } = useDomains(app);
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
};
