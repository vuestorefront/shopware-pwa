<template>
  <div class="">
    <SfSelect
      @change="emit('change', $event.target.value)"
      v-if="options.length"
      v-model="selectedOption"
      :selected="value"
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
    value: {
      value: [null, String],
      default: null
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
      selectedOption: null
    }
  }
}
</script>
<style lang="scss" scoped></style>
