import { computed } from "@vue/composition-api"
import languagesMap from "sw-plugins/languages"
import { getApplicationContext } from "@shopware-pwa/composables"

export const useLocales = (rootContext) => {
  const { i18n, router } = getApplicationContext(rootContext, "useLocales")

  // TODO: consider using availabeDomains config to list the languages
  const availableLanguages = computed(() => Object.values(languagesMap) || [])
  // TODO: consider using locale code from current domains config
  const currentLocale = computed(() => i18n.locale)

  const changeLocale = async (localeCode) => {
    // look for current domain
    const domainForLocaleFound = rootContext.$routing.availableDomains.find(
      (domain) => domain.languageLocaleCode == localeCode
    )
    // remove domain
    const cleanPath = rootContext.$route.fullPath.replace(
      rootContext.$routing.getCurrentDomain().url,
      ""
    )
    // build the new url based on current domain
    const newUrl = `${
      domainForLocaleFound.url !== "/" ? `${domainForLocaleFound.url}` : ""
    }/${cleanPath}`

    domainForLocaleFound && router.push(newUrl.replace(/\/\/+/, "/"))
  }

  return {
    availableLanguages,
    changeLocale,
    currentLocale,
  }
}
