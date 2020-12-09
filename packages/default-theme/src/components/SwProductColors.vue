<template>
  <div class="product-colors">
    <p class="product-colors__label">{{ label }}</p>
    <SfColor
      v-for="(color, code) in availableColors"
      :key="code"
      :color="color.color"
      :aria-label="color.label"
      :selected="value === color.code"
      @click="$emit('input', color.code)"
      class="product-colors__color"
    />
  </div>
</template>

<script>
import { SfColor } from "@storefront-ui/vue"
import { isOptionAvailableForSelectedOptions as isOptionAvailable } from "@shopware-pwa/helpers"

export default {
  name: "SwProductColors",
  components: { SfColor },
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    colors: {
      type: Array,
      default: () => [],
    },
    allOptions: {
      type: Object,
      default: () => [],
    },
    allSelected: {
      type: Object,
      default: () => [],
    },
  },
  computed: {
    availableColors() {
      return this.colors.filter((color) =>
        this.isOptionAvailableForSelectedOptions(color)
      )
    },
  },
  methods: {
    isOptionAvailableForSelectedOptions(option) {
      return isOptionAvailable(
        this.label,
        this.value,
        option,
        this.allOptions,
        this.allSelected
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.product-colors {
  display: flex;
  align-items: center;
  &__label {
    margin-right: var(--spacer-sm);
  }
  &__color {
    margin: 0 var(--spacer-xs);
  }
}
</style>
