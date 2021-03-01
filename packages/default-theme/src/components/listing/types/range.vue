<template>
  <div>
    <SfHeading class="filters__title" :level="4" :title="$t(filter.label)" />
    <div class="filter__range">
      <SwInput
        :label="$t('Min')"
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
  </div>
</template>
<script>
import { computed, ref } from "@vue/composition-api"

import { SfFilter, SfHeading } from "@storefront-ui/vue"
import SwInput from "@/components/atoms/SwInput"
import { validationMixin } from "vuelidate"
import { required, email } from "vuelidate/lib/validators"

export default {
  components: {
    SfFilter,
    SwInput,
    SfHeading,
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
    currentFilters: {
      type: Object,
      default: () => ({}),
    },
  },
  setup({ filter, selectedValues, currentFilters }, { emit }) {
    const minFilterCode = `min-${filter.code}`
    const maxFilterCode = `max-${filter.code}`

    const min = ref(currentFilters[minFilterCode])
    const max = ref(currentFilters[maxFilterCode])

    const minChanged = () => {
      emit("toggle-filter-value", {
        ...filter,
        type: "range",
        code: minFilterCode,
        value: min.value,
      })
    }
    const maxChanged = () => {
      emit("toggle-filter-value", {
        ...filter,
        type: "range",
        code: maxFilterCode,
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
::v-deep.sf-heading {
  --heading-text-align: left;
}

.filter {
  &__range {
    display: flex;
    flex: 1 1;
  }
}
</style>
