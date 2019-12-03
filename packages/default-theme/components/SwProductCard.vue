<template>
  <!-- <router-link :to="getRouterLink"> -->
  <SfProductCard
    :title="product.name || ''"
    :image="require('~/assets/productB.jpg')" 
    :regular-price="getUnitPrice"
    :isOnWishlist="false"
    :link="getRouterLink"
    @click:wishlist="toggleWishlist"
    class="products__product-card"
    >
    <template #title={title}>
      <div class="product-card-title">
        <h3 class="product-card-title__title">
          {{ title }}
        </h3>
      </div>
    </template>
    <template slot="reviews">
      <SfAddToCart
        :stock="getStock"
        v-model="quantity"
        @click="addToCart"
      />
    </template>
  </SfProductCard>
  <!-- </router-link> -->
</template>

<script>
import { SfProductCard, SfAddToCart } from "@storefront-ui/vue";
import { useAddToCart } from "@shopware-pwa/composables"

export default {
  components: {
    SfProductCard,
    SfAddToCart
  },
  setup ({product}) {
    const {addToCart, quantity, getStock} = useAddToCart(product)

    return {
      quantity,
      addToCart,
      getStock
    }
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
    async toggleWishlist() {
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles.scss";

.product-card-title {
  height: 4em;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  &__title {
    font-family: $body-font-family-secondary;
    font-size: $font-size-regular-mobile;
    font-weight: 300;
    line-height: 1.6;
    margin: $spacer-small 0;
    @media (min-width: $desktop-min) {
      margin: $spacer 0 $spacer-small;
      font-size: $font-size-regular-desktop;
    }
    &:hover {
      cursor: pointer;
      color: $c_gray;
    }
  }
}
</style>
