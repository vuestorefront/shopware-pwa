import { computed, getCurrentInstance } from '@vue/composition-api'
import languagesMap from 'sw-plugins/languages'

export const useLocales = () => {
  const vm = getCurrentInstance()

  const availableLanguages = computed(() => Object.values(languagesMap) || [])
  const currentLocale = computed(() => vm.$i18n.locale)

  const changeLocale = async (localeCode) => {
    if (localeCode === vm.$i18n.locale) return
    if (localeCode === vm.$i18n.fallbackLocale) {
      vm.$router.push(vm.$route.fullPath.replace(/^\/[^\/]+/, ''))
    } else {
      vm.$router.push(`/${localeCode}${vm.$route.fullPath}`)
    }
  }

  return {
    availableLanguages,
    changeLocale,
    currentLocale,
  }
}
