<template>
  <div class="filter__max">
    <SfHeading class="filters__title" :level="4" :title="filter.label" />
    <SfCheckbox
      v-model="selected"
      @change="
        $emit('toggle-filter-value', {
          ...filter,
          type: 'max',
          value: !currentFilters[filter.code],
        })
      "
    />
  </div>
</template>
<script>
import { computed, ref } from "@vue/composition-api"

import { SfFilter, SfCheckbox, SfHeading } from "@storefront-ui/vue"
import SwInput from "@/components/atoms/SwInput"

export default {
  name: "SwFilterShippingFree",
  components: {
    SfFilter,
    SwInput,
    SfCheckbox,
    SfHeading,
  },
  data() {
    return {
      selected: this.currentFilters[this.filter.code] === "true",
    }
  },
  props: {
    filter: {
      type: Object,
      default: () => ({}),
    },
    currentFilters: {
      type: Object,
      default: () => ({}),
    },
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
