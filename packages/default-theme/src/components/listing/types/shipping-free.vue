<template>
  <div class="filter__max">
    <SfHeading class="filters__title" :level="4" :title="$t(filter.label)" />
    <SwCheckbox
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

import { SfFilter, SfHeading } from "@storefront-ui/vue"
import SwInput from "@/components/atoms/SwInput.vue"
import SwCheckbox from "@/components/atoms/SwCheckbox.vue"

export default {
  name: "SwFilterShippingFree",
  components: {
    SfFilter,
    SwInput,
    SwCheckbox,
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
