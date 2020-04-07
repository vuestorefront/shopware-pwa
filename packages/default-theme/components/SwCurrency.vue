<template>
  <div class="container">
    {{activeCurrency}}
    <SfSelect v-model="activeCurrency" class="container__select">
      <SfSelectOption v-for="currencyItem in availableCurrencies" :key="currencyItem.id" :value="currencyItem.id">
        <div>{{ currencyItem.symbol }}</div>
      </SfSelectOption>
    </SfSelect>
  </div>
</template>
<script>
import { SfSelect } from '@storefront-ui/vue';
import { useCurrencySwitcher } from '@shopware-pwa/composables';
import { computed } from '@vue/composition-api';

export default {
  name: 'SwCurrency',
  components: {
    SfSelect
  },
  data() {
    return {
      currency: null
    }
  },
  setup() {
    const { 
      availableCurrencies,
      currentCurrency 
      } = useCurrencySwitcher()
    const activeCurrency = computed(() => currentCurrency.value && currentCurrency.value.symbol)
    return {
      availableCurrencies,
      currentCurrency,
      activeCurrency
    }
  },
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.container {
  margin: 0 -5px;


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