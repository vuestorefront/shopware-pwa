<template>
  <div
    v-if="availableDomains.length > 1"
    class="sw-language-switcher"
    data-cy="language-switcher"
  >
    <SfSelect
      :value="currentDomainId"
      class="sw-language-switcher__select sf-select--no-chevron"
      data-cy="language-switcher-select"
      @input="changeDomain"
    >
      <SfSelectOption
        v-for="domain in availableDomains"
        :key="domain.domainId"
        :value="domain.domainId"
        data-cy="language-switcher-option"
        >{{ domain.languageLabel }}</SfSelectOption
      >
    </SfSelect>
  </div>
</template>
<script>
import { SfSelect } from "@storefront-ui/vue"
import { useDomains } from "@/logic/useDomains"

export default {
  name: "SwLanguageSwitcher",

  components: {
    SfSelect,
  },

  setup(props, { root }) {
    const { availableDomains, currentDomainId, changeDomain } = useDomains(root)
    return {
      availableDomains,
      currentDomainId,
      changeDomain,
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
    max-height: 28px;
    ::v-deep .sf-select__dropdown {
      cursor: pointer;
      background: var(--c-light);
    }
  }
}
</style>
