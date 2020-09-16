<template>
  <div class="filter__range">
    <SwInput
      label="Min"
      name="min"
      class="filter__range-min"
      type="number"
      v-model="min"
      @blur="minChanged"
    />
    <SwInput
      label="Max"
      name="max"
      class="filter__range-max"
      type="number"
      v-model="max"
      @blur="maxChanged"
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
    const min = ref(selectedValues.gt || filter.min)
    const max = ref(selectedValues.lt || filter.max)

    const minChanged = () => {
      emit("toggle-filter-value", {
        ...filter,
        type: "range",
        code: `min-${filter.code}`,
        value: min.value,
      })
    }
    const maxChanged = () => {
      emit("toggle-filter-value", {
        ...filter,
        type: "range",
        code: `max-${filter.code}`,
        value: max.value,
      })
    }
    return {
      min,
      max,
      minChanged,
      maxChanged,
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
