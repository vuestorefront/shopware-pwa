import { computed } from "@vue/composition-api"
import languagesMap from "sw-plugins/languages"

export const useLocales = (rootContext) => {
  // TODO getAppContext

  const availableLanguages = computed(() => Object.values(languagesMap) || [])
  const currentLocale = computed(() => rootContext.$i18n.locale)

  const changeLocale = async (localeCode) => {
    if (localeCode === rootContext.$i18n.locale) return
    if (localeCode === rootContext.$i18n.fallbackLocale) {
      rootContext.$router.push(
        rootContext.$route.fullPath.replace(/^\/[^\/]+/, "")
      )
    } else {
      rootContext.$router.push(`/${localeCode}${rootContext.$route.fullPath}`)
    }
  }

  return {
    availableLanguages,
    changeLocale,
    currentLocale,
  }
}
