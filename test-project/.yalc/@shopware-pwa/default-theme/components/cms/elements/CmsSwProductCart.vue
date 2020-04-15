<template>
  <SwProductCard :product="content.data.product" />
</template>

<script>
import SwProductCard from "../../SwProductCard";

export default {
  components: {
    SwProductCard
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
