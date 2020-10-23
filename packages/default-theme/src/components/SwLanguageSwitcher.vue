<template>
  <div class="sw-language-switcher" data-cy="language-switcher">
    <SfSelect
      :selected="currentLocale"
      :size="availableLanguages.length"
      class="sw-language-switcher__select sf-select--no-chevron"
      data-cy="language-switcher-select"
      @change="changeLocale"
    >
      <SfSelectOption
        v-for="language in availableLanguages"
        :key="language.code"
        :value="language.code"
        data-cy="language-switcher-option"
        >{{ language.name }}</SfSelectOption
      >
    </SfSelect>
  </div>
</template>
<script>
import { SfSelect } from "@storefront-ui/vue"
import { useLocales } from "@/logic/useLocales"

export default {
  name: "SwLanguageSwitcher",

  components: {
    SfSelect,
  },

  setup(props, { root }) {
    const { availableLanguages, currentLocale, changeLocale } = useLocales(root)
    return {
      availableLanguages,
      currentLocale,
      changeLocale,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-language-switcher {
  --select-margin: 0;
  --select-padding: 0;
  --select-selected-justify-content: center;
  --select-selected-padding: 0 var(--spacer-xs);
  max-height: var(--top-bar-height, 2.5rem);
  text-align: center;

  .sf-select {
    cursor: pointer;
  }
}
</style>
