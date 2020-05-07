<template>
  <SfProductCard
    :title="getName"
    :image="getImageUrl"
    :special-price="getSpecialPrice | price"
    :regular-price="getRegularPrice | price"
    :max-rating="5"
    :score-rating="getProductRating"
    :image-width="700"
    :image-height="1000"
    :is-on-wishlist="false"
    :link="getRouterLink"
    class="sw-product-card"
    :show-add-to-cart-button="true"
    :is-added-to-cart="isInCart"
    @click:wishlist="toggleWishlist"
    @click:add-to-cart="addToCart"
  >
  </SfProductCard>
</template>

<script>
import { SfProductCard, SfAddToCart } from '@storefront-ui/vue'
import { useAddToCart } from '@shopware-pwa/composables'
import {
  getProductMainImageUrl,
  getProductRegularPrice,
  getProductUrl,
  getProductSpecialPrice,
  getProductName,
} from '@shopware-pwa/helpers'

export default {
  components: {
    SfProductCard,
    SfAddToCart,
  },
  setup({ product }) {
    const { addToCart, quantity, getStock, isInCart } = useAddToCart(product)
    return {
      quantity,
      addToCart,
      getStock,
      isInCart,
    }
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
  computed: {
    getName() {
      return getProductName({ product: this.product })
    },
    getProductRating() {
      return this.product && this.product.ratingAverage
    },
    // should be replaced with prettyUrl attribute when pretty urls are included in product entity
    getRouterLink() {
      return getProductUrl(this.product)
    },
    getRegularPrice() {
      // TODO: remove that logic once the SW6 API returns right data
      // related: https://github.com/DivanteLtd/shopware-pwa/issues/263
      const regular = getProductRegularPrice({ product: this.product })
      const special = getProductSpecialPrice(this.product)
      // temporary fix to show proper regular price
      return regular > special ? regular : special
    },
    getSpecialPrice() {
      // TODO: remove that logic once the SW6 API returns right data
      // related: https://github.com/DivanteLtd/shopware-pwa/issues/263
      const special = getProductSpecialPrice(this.product)
      const regular = getProductRegularPrice({ product: this.product })
      // temporary fix to show proper special price
      return special && (special < regular ? special : regular)
    },
    getImageUrl() {
      return (
        getProductMainImageUrl(this.product) ||
        require('@shopware-pwa/default-theme/assets/productB.jpg')
      )
    },
  },
  methods: {
    async toggleWishlist() {},
  },
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';

.sw-product-card {
  --product-card-add-button-top: 13rem;
}
</style>
