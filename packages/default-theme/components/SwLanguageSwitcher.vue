<template>
  <div class="sw-language-switcher">
    <SfSelect
      :selected="currentLocale"
      :size="availableLanguages.length"
      class="sw-language-switcher__select sf-select--no-chevron"
      @change="changeLocale"
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
  --select-padding: 0;
  --select-margin: 0;
  --select-selected-padding: 0 var(--spacer-xs);
  --select-selected-justify-content: center;
  text-align: center;
  cursor: pointer;
}
</style>
