<template>
  <SwProductCart :product="content.data.product" />
</template>

<script>
import SwProductCart from "../../SwProductCart";

export default {
  components: {
    SwProductCart
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
