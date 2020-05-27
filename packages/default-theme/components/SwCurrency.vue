<template>
  <!-- TODO: change this if after onMounted hook here is resolved -->
  <div
    v-if="activeCurrency && availableCurrencies.length > 1"
    class="sw-currency"
  >
    <SfSelect
      v-model="activeCurrency"
      :size="availableCurrencies.length"
      class="sw-currency__select sf-select--no-chevron"
      @click="loadAvailableCurrencies"
    >
      <SfSelectOption
        v-for="currencyItem in availableCurrencies"
        :key="currencyItem.id"
        :value="currencyItem.id"
      >
        {{ currencyItem.symbol }}
      </SfSelectOption>
    </SfSelect>
  </div>
</template>
<script>
import { SfSelect, SfProductOption } from '@storefront-ui/vue'
import { useCurrency } from '@shopware-pwa/composables'
import { computed, onMounted, getCurrentInstance } from '@vue/composition-api'

export default {
  name: 'SwCurrency',
  components: {
    SfSelect,
  },
  setup(context) {
    const {
      currency,
      setCurrency,
      loadAvailableCurrencies,
      availableCurrencies,
    } = useCurrency()
    const vm = getCurrentInstance()

    // TODO: loaded on mounted only untill fixed issue: https://github.com/DivanteLtd/storefront-ui/issues/1097
    onMounted(async () => {
      await loadAvailableCurrencies()
    })

    const activeCurrency = computed({
      get: () => currency.value && currency.value.id,
      set: async (id) => {
        await setCurrency({ id })
        vm.$router.push({
          query: { ...vm.$router.currentRoute.query, currencyId: id },
        })
      },
    })
    return {
      availableCurrencies,
      activeCurrency,
      loadAvailableCurrencies,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables';

.sw-currency {
  --select-padding: 0;
  --select-margin: 0;
  --select-selected-padding: 0 var(--spacer-xs);
  --select-selected-justify-content: center;
  text-align: center;
  cursor: pointer;
}
</style>
