<template>
  <!-- TODO: change this if after onMounted hook here is resolved -->
  <div
    class="sw-language-switcher"
    v-if="activeLanguage && availableLanguages.length > 1"
  >
    <SfSelect
      v-model="activeLanguage"
      :size="availableLanguages.length"
      class="sw-language-switcher__select"
      @click="loadAvailableLanguages"
    >
      <SfSelectOption
        v-for="currencyItem in availableLanguages"
        :key="currencyItem.id"
        :value="currencyItem.id"
      >
        {{ currencyItem.translationCode.name }}
      </SfSelectOption>
    </SfSelect>
  </div>
</template>
<script>
import { SfSelect, SfProductOption } from '@storefront-ui/vue'
import { useSessionContext } from '@shopware-pwa/composables'
import { computed, onMounted, ref } from '@vue/composition-api'
import {
  getAvailableLanguages,
  setCurrentLanguage,
} from '@shopware-pwa/shopware-6-client'

export default {
  name: 'SwLanguageSwitcher',
  components: {
    SfSelect,
  },
  setup(context) {
    const { sessionContext, refreshSessionContext } = useSessionContext()

    const availableLanguages = ref([])

    const loadAvailableLanguages = async () => {
      availableLanguages.value = await getAvailableLanguages()
    }

    // TODO: loaded on mounted only untill fixed issue: https://github.com/DivanteLtd/storefront-ui/issues/1097
    onMounted(async () => {
      await loadAvailableLanguages()
    })

    const activeLanguage = computed({
      get: () =>
        sessionContext.value &&
        sessionContext.value.salesChannel &&
        sessionContext.value.salesChannel.languageId,
      // set: async (id) => await setCurrency({ id }),
      set: async (id) => {
        await setCurrentLanguage(id)
        await refreshSessionContext()
      },
    })
    return {
      availableLanguages,
      activeLanguage,
      loadAvailableLanguages,
      sessionContext,
    }
  },
  watch: {
    activeLanguage: {
      immediate: true,
      handler: function (val) {
        if (!val || !this.availableLanguages.length) return
        const code = this.availableLanguages.find((lang) => lang.id === val)
        // console.error('ACTIVE LANGUAGE CHANGED!', code)
        const xx = code && code.translationCode && code.translationCode.code
        this.redirectToLocale(xx)
      },
    },
    availableLanguages(languages) {
      if (languages.length) {
        // console.error('LANGUAGES', languages.length)
        const curr = languages.find((lang) => lang.id === this.activeLanguage)
        // console.error('CURRENT', curr)
        const cirrCode = curr.translationCode && curr.translationCode.code
        if (cirrCode !== this.$i18n.locale) {
          // console.error('SHOULD SWITCH LOCALE', cirrCode)
          this.redirectToLocale(cirrCode)
        }
      }
    },
  },
  methods: {
    redirectToLocale(localeCode) {
      // console.error('Redirecting to locale', localeCode)
      if (localeCode === this.$i18n.fallbackLocale) {
        // console.error('STANDARD LANGUAGE!')
        this.$router.push(this.$route.fullPath.replace(/^\/[^\/]+/, ''))
      } else {
        // console.error('CUSTOM LANGUAGE')
        this.$router.push(`/${localeCode}${this.$route.fullPath}`)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.sw-language-switcher {
  text-align: center;
  &__select {
    --select-margin: 0;
    --chevron-size: 0;
    --select-option-font-size: var(--font-base);
    --select-selected-padding: 0.5rem;
    cursor: pointer;
  }
}
</style>
