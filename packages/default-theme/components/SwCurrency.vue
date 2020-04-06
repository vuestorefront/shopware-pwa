<template>
  <div class="container">
    
    <SfSelect v-model="currency" class="container__select">
      <SfSelectOption v-for="currencyItem in availableCurrencies" :key="currencyItem.name" :value="currencyItem.name">
        <div>{{ currencyItem.symbol }}</div>
      </SfSelectOption>
    </SfSelect>
  </div>
</template>
<script>
import { SfSelect, SfSelectOption } from '@storefront-ui/vue';
import { useCurrencySwitcher } from '@shopware-pwa/composables';

export default {
  name: 'SwCurrency',
  components: {
    SfSelect,
  },

  setup() {
    const { 
      availableCurrencies,
      currentCurrency 
      } = useCurrencySwitcher()

    return {
      availableCurrencies,
      currentCurrency
    }
  },
  watch: {
    
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.container {
  margin: 0 -5px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  &::v-deep .sf-select {
    --select-font-size: var(--font-size-small);
  }

  &__select {
    padding: 0 5px;
    margin: 0;
    cursor: pointer;

    &::v-deep .sf-select__dropdown {
      min-width: 150px;
    }

    &::v-deep .sf-select__selected {
      padding: 0;
      display: flex;
      align-items: center;
    }
  }
}
</style>