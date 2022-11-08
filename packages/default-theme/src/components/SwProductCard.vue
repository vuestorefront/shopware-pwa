<template>
  <SwPluginSlot
    name="product-card"
    :slot-context="product"
    style="display: contents"
  >
    <ProductCard :product="product"/>
  </SwPluginSlot>
</template>

<script>
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue";
import ProductCard from "@/components/card/ProductCard.vue"

export default {
  components: {
    ProductCard,
    SwPluginSlot
  },
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.sw-product-card {
  overflow: hidden;
  --image-width: 200px;
  --image-height: 400px;
}
.variants-price {
  .sf-price__regular {
    font-size: 0.9em;
  }
}
</style>
