<template>
  <div class="filter__max">
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

import { SfFilter, SfCheckbox } from "@storefront-ui/vue"
import SwInput from "@shopware-pwa/default-theme/components/atoms/SwInput"

export default {
  name: "SwFilterShippingFree",
  components: {
    SfFilter,
    SwInput,
    SfCheckbox,
  },
  data() {
    return {
      selected: false, // !!this.currentFilters[filter.code],
    }
  },
  props: {
    filter: {
      type: Object,
      default: () => ({}),
    },
    currentFilters: {
      type: Object,
    },
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
