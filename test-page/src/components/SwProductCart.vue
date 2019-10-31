<template>
  <router-link :to="{ name: 'product', params: { id: product.id } }">
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
    getUnitPrice() {
      return (
        this.product.calculatedPrice && this.product.calculatedPrice.unitPrice
      );
    },
    getImageUrl() {
      return this.product.media && this.product.media.length
        ? this.product.media[0].media.url
        : "";
    }
  },
  methods: {
    toggleWishlist() {
    }
  }
};
</script>

<style lang="scss" scoped></style>
