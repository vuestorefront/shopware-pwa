<template>
  <div class="filter__max">
    <SfCheckbox
      v-model="selected"
      @change="
        $emit('toggle-select', {
          type: 'max',
          max: !max,
          field: filter.name,
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
      selected: this.max,
    }
  },
  props: {
    filter: {
      type: Object,
      default: () => ({}),
    },
    max: {
      type: Boolean,
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
