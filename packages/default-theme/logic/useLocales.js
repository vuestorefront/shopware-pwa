import { computed } from "@vue/composition-api"
import languagesMap from "sw-plugins/languages"
import { getApplicationContext } from "@shopware-pwa/composables"

export const useLocales = (rootContext) => {
  const { i18n, router } = getApplicationContext(
    rootContext,
    "useUICheckoutPage"
  )

  const availableLanguages = computed(() => Object.values(languagesMap) || [])
  const currentLocale = computed(() => i18n.locale)

  const changeLocale = async (localeCode) => {
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
