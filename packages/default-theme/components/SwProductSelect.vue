<template>
  <div class="">
    <SfSelect
      v-if="options.length"
      v-model="selectedOption"
      :label="label"
      class="sf-select--underlined product-details__attribute"
      @change="$emit('change', selectedOption)"
    >
      <SfSelectOption
        v-for="option in options"
        :key="option.code"
        :value="option.code"
      >
      <slot v-bind="option">
        <SfProductOption :label="option.label" :color="label=='color' ? option.label : null" />
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
  model: {
    prop: 'selected',
    event: 'select'
  },
  props: {
    value: {
      type: String,
      default: ""
    },
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
      selectedOption: this.value
    }
  }
}
</script>
<style lang="scss" scoped></style>
