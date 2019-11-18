<template>
  <router-link :to="getRouterLink">
    <SfProductCard
      :title="product.name || ''"
      :image="getImageUrl"
      :regular-price="getUnitPrice"
      :isOnWishlist="false"
      @click:wishlist="toggleWishlist"
      class="products__product-card"
    />
  </router-link>
</template>

<script>
import { SfProductCard } from "@storefront-ui/vue";

export default {
  components: {
    SfProductCard
  },
  data() {
    return {};
  },
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // should be replaced with prettyUrl attribute when pretty urls are included in product entity
    getRouterLink() {
      return `/detail/${this.product.id}`
    },
    getUnitPrice() {
      return (
        this.product.calculatedPrice && this.product.calculatedPrice.unitPrice
      );
    },
    getImageUrl() {
      return this.product.cover ? this.product.cover.media.url : "";
    }
  },
  methods: {
    toggleWishlist() {}
  }
};
</script>

<style lang="scss" scoped></style>
