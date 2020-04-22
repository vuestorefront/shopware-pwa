<template>
  <!-- TODO: change this if after onMounted hook here is resolved -->
  <div
    class="container"
    v-if="activeCurrency && availableCurrencies.length > 1"
  >
    <SfSelect
      v-model="activeCurrency"
      :size="availableCurrencies.length"
      class="container__select"
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
import { computed, onMounted } from '@vue/composition-api'

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

    // TODO: loaded on mounted only untill fixed issue: https://github.com/DivanteLtd/storefront-ui/issues/1097
    onMounted(async () => {
      await loadAvailableCurrencies()
    })

    const activeCurrency = computed({
      get: () => currency.value && currency.value.id,
      set: async (id) => await setCurrency({ id }),
    })
    return {
      availableCurrencies,
      activeCurrency,
      loadAvailableCurrencies,
    }
  },
  watch: {
    activeCurrency(val) {
      // re're invoking page reload by adding/changing currenctId in query params
      this.$router.push({
        query: { ...this.$router.currentRoute.query, curencyId: val },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.menu-button {
  .container {
    margin: 0;
    &::v-deep .sf-select {
      --select-font-size: 1.4rem;
      --select-font-weight: 400;
      color: #afb0b6;

      &__dropdown {
        --select-font-size: var(--font-size-medium);
        --select-font-weight: 200;
        color: var(--c-text);
      }
    }
  }
}
.container {
  text-align: center;
  margin: 0 0 0 var(--spacer-big);
  padding: 10 px;
  &::v-deep .sf-select {
    --select-font-size: var(--font-size-medium);
    --select-font-weight: 400;
  }

  &__select {
    margin: 0;
    display: block;
    cursor: pointer;

    &::v-deep .sf-select__dropdown {
      min-width: 50px;
    }

    &::v-deep .sf-select__selected {
      text-align: center;
      display: block;
    }
  }
}
</style>
