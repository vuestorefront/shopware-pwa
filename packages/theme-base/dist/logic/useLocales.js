import { computed } from "@vue/composition-api";
import languagesMap from "sw-plugins/languages";
import { getApplicationContext } from "@shopware-pwa/composables";

/**
 * @deprecated - in case changing a language - use `useDomains` instead
 */
export const useLocales = () => {
  const { i18n, router, route } = getApplicationContext({
    contextName: "useLocales",
  });

  const availableLanguages = computed(() => Object.values(languagesMap) || []);
  const currentLocale = computed(() => i18n.locale);

  const changeLocale = async (localeCode) => {
    if (localeCode === i18n.locale) return;
    if (localeCode === i18n.fallbackLocale) {
      router.push(route.fullPath.replace(/^\/[^\/]+/, ""));
    } else {
      router.push(`/${localeCode}${route.fullPath}`);
    }
  };

  return {
    availableLanguages,
    changeLocale,
    currentLocale,
  };
};
