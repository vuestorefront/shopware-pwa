<template>
  <div class="">
    <SfSelect
      v-if="options.length"
      v-model="selectedOption"
      :label="label"
      class="sf-select--bordered product-details__attribute"
    >
      <SfSelectOption
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        <slot v-bind="option">
          <SfProductOption :label="option.label" />
        </slot>
      </SfSelectOption>
    </SfSelect>
  </div>
</template>
<script>
import { SfSelect, SfProductOption } from '@storefront-ui/vue'

export default {
  name: 'SwProductSelect',
  components: { SfSelect, SfProductOption },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedOption: null
    }
  }
}
</script>
<style lang="scss" scoped></style>
