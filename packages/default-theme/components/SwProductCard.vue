<template>
  <SfProductCard
    :title="product.name || ''"
    :image="getImageUrl"
    :special-price="getSpecialPrice"
    :image-width="216"
    :image-height="326"
    :regular-price="getRegularPrice"
    :isOnWishlist="false"
    :link="getRouterLink"
    @click:wishlist="toggleWishlist"
    class="products__product-card"
    :showAddToCartButton="true"
    :isAddedToCart="isInCart"
    @click:add-to-cart="addToCart"
  >
    <template #title="{title}">
      <div class="product-card-title">
        <h3 class="product-card-title__title">
          {{ title }}
        </h3>
      </div>
    </template>
  </SfProductCard>
</template>

<script>
import { SfProductCard, SfAddToCart } from '@storefront-ui/vue'
import { useAddToCart } from '@shopware-pwa/composables'
import {
  getProductMainImageUrl,
  getProductRegularPrice,
  getProductUrl,
  getProductSpecialPrice
} from '@shopware-pwa/helpers'

export default {
  components: {
    SfProductCard,
    SfAddToCart
  },
  setup({ product }) {
    const { addToCart, quantity, getStock, isInCart } = useAddToCart(product)

    return {
      quantity,
      addToCart,
      getStock,
      isInCart
    }
  },
  data() {
    return {}
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
      return getProductUrl(this.product)
    },
    getRegularPrice() {
      const regular = getProductRegularPrice({ product: this.product })
      const special = getProductSpecialPrice(this.product)
      // temporary fix to show proper regular price
      return '$' + (regular > special ? regular : special)
    },
    getSpecialPrice() {
      const special = getProductSpecialPrice(this.product)
      const regular = getProductRegularPrice({ product: this.product })
      // temporary fix to show proper special price
      return special && '$' + (special < regular ? special : regular)
    },
    getImageUrl() {
      return (
        getProductMainImageUrl({ product: this.product }) ||
        require('~/assets/productB.jpg')
      )
    }
  },
  methods: {
    async toggleWishlist() {}
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';

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
