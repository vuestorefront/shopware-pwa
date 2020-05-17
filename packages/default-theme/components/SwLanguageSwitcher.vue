<template>
  <div class="sw-language-switcher">
    <SfSelect
      :selected="activeLanguage"
      @change="redirectToLocale"
      :size="availableLanguages.length"
      class="sw-language-switcher__select"
    >
      <SfSelectOption
        v-for="language in availableLanguages"
        :key="language.code"
        :value="language.code"
      >
        {{ language.name }}
      </SfSelectOption>
    </SfSelect>
  </div>
</template>
<script>
import { SfSelect, SfProductOption } from '@storefront-ui/vue'
import { computed, onMounted, ref } from '@vue/composition-api'
import languagesMap from 'sw-plugins/languages'

export default {
  name: 'SwLanguageSwitcher',
  components: {
    SfSelect,
  },
  computed: {
    availableLanguages() {
      return Object.values(languagesMap)
    },
    activeLanguage() {
      return this.$i18n.locale
    },
  },
  methods: {
    redirectToLocale(localeCode) {
      if (localeCode === this.$i18n.locale) return
      if (localeCode === this.$i18n.fallbackLocale) {
        this.$router.push(this.$route.fullPath.replace(/^\/[^\/]+/, ''))
      } else {
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
