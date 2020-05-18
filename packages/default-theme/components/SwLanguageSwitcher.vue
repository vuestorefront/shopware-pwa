<template>
  <div class="sw-language-switcher">
    <SfSelect
      :selected="currentLocale"
      @change="changeLocale"
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
import { useLocales } from '@shopware-pwa/default-theme/logic/useLocales'

export default {
  name: 'SwLanguageSwitcher',
  components: {
    SfSelect,
  },
  setup() {
    const { availableLanguages, currentLocale, changeLocale } = useLocales()
    return {
      availableLanguages,
      currentLocale,
      changeLocale,
    }
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
