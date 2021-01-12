import { computed } from "@vue/composition-api"
import languagesMap from "sw-plugins/languages"
import { getApplicationContext } from "@shopware-pwa/composables"

export const useLocales = (rootContext) => {
  const { i18n, router } = getApplicationContext(rootContext, "useLocales")

  const availableLanguages = computed(() => Object.values(languagesMap) || [])
  const currentLocale = computed(() => i18n.locale)

  const changeLocale = async (localeCode) => {
    console.info(
      "rootContext.$domainsRouting.availableDomains",
      rootContext.$domainsRouting.availableDomains
    )
    const domainForLocaleFound = rootContext.$domainsRouting.availableDomains.find(
      (domain) => domain.languageLocaleCode == localeCode
    )
    const newUrl = rootContext.$route.fullPath.replace(
      rootContext.$domainsRouting.getCurrentDomain().url,
      ""
    )
    const newUrl2 = `${
      domainForLocaleFound.url !== "/" ? `${domainForLocaleFound.url}` : ""
    }/${newUrl}`
    domainForLocaleFound && router.push(newUrl2)
  }

  return {
    availableLanguages,
    changeLocale,
    currentLocale,
  }
}
