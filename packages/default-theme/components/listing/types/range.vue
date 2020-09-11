<template>
  <div class="filter__range">
    <SwInput
      label="Min"
      name="min"
      class="filter__range-min"
      type="number"
      v-model="min"
    />
    <SwInput
      label="Max"
      name="max"
      class="filter__range-max"
      type="number"
      v-model="max"
    />
  </div>
</template>
<script>
import { computed, ref } from "@vue/composition-api"

import { SfFilter } from "@storefront-ui/vue"
import SwInput from "@shopware-pwa/default-theme/components/atoms/SwInput"
import { validationMixin } from "vuelidate"
import { required, email } from "vuelidate/lib/validators"

export default {
  components: {
    SfFilter,
    SwInput,
  },
  mixins: [validationMixin],
  props: {
    filter: {
      type: Object,
      default: () => ({}),
    },
    selectedValues: {
      type: Array | Object,
      default: () => [],
    },
  },
  setup({ filter, selectedValues }, { emit }) {
    const min = computed({
      get: () => selectedValues.gt || filter.min,
      set: (value) =>
        emit("toggle-filter-value", {
          type: "range",
          parameters: {
            gt: value,
          },
          field: filter.name,
        }),
    })
    const max = computed({
      get: () => selectedValues.lt || filter.max,
      set: (value) =>
        emit("toggle-filter-value", {
          type: "range",
          parameters: {
            lt: value,
          },
          field: filter.name,
        }),
    })
    return {
      min,
      max,
    }
  },
}
</script>
<style lang="scss" scoped>
.filter {
  &__range {
    display: flex;
    flex: 1 1;
  }
}
</style>
