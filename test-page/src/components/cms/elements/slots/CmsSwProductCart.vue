<template>
  <SwIdProductCart :product-id="content.config.product.value" />
</template>

<script>
import SwIdProductCart from "./SwIdProductCart";

export default {
  components: {
    SwIdProductCart
  },
  props: {
    content: {
      type: Object,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped></style>
