<template>
  <div class="">
    <SfComponentSelect
      v-if="options.length"
      v-model="selectedOption"
      :label="label"
      class="sf-select--underlined product-details__attribute"
      @change="$emit('change', selectedOption)"
    >
      <SfComponentSelectOption
        v-for="option in options"
        :key="option.code"
        :value="option.code"
      >
        <slot v-bind="option">
          <SfProductOption :label="`${option.label}`" :color="option.color" />
        </slot>
      </SfComponentSelectOption>
    </SfComponentSelect>
  </div>
</template>
<script>
import { SfComponentSelect, SfProductOption } from "@storefront-ui/vue"

export default {
  name: "SwProductSelect",
  components: { SfComponentSelect, SfProductOption },
  model: {
    prop: "selected",
    event: "select",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selectedOption: this.value,
    }
  },
}
</script>
<style lang="scss" scoped></style>
