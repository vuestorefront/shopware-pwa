import { computed } from "@vue/composition-api"
import domains from "sw-plugins/domains"
import { getApplicationContext } from "@shopware-pwa/composables"

export const useDomains = (rootContext) => {
  const { i18n, router } = getApplicationContext(rootContext, "useDomains")

  const availableLanguages = computed(() => Object.values(domains) || [])
  const currentLocale = computed(() => i18n.locale)

  const changeDomain = async (domainId) => {
    if (localeCode === i18n.locale) return
    if (localeCode === i18n.fallbackLocale) {
      router.push(rootContext.$route.fullPath.replace(/^\/[^\/]+/, ""))
    } else {
      router.push(`/${localeCode}${rootContext.$route.fullPath}`)
    }
  }

  return {
    availableLanguages,
    changeLocale,
    currentLocale,
  }
}
