<template>
  <div class="product-colors">
    <p class="product-colors__label">{{ label }}</p>
    <SfColor
      v-for="(color, code) in colors"
      :key="code"
      :color="color.value"
      :aria-label="color.label"
      :selected="value === color.code"
      @click="$emit('input', color.code)"
      class="product-colors__color"
    />
  </div>
</template>

<script>
import { SfColor } from '@storefront-ui/vue'

export default {
  name: 'SwProductColors',
  components: { SfColor },
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    colors: {
      type: Array,
      default: () => [],
    },
  }
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
