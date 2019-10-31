<template>
  <SwProductCart :product="product" />
</template>

<script>
import SwProductCart from "../SwProductCart";
import { getProduct } from "@shopware-pwa/shopware-6-client";

export default {
  components: {
    SwProductCart
  },
  data() {
    return {
      product: {}
    };
  },
  props: {
    productId: {
      type: String,
      default: ""
    }
  },
  computed: {},
  async mounted() {
    if (this.productId) {
      this.product = await getProduct(this.productId);
    }
  }
};
</script>

<style lang="scss" scoped></style>
