<template>
  <SfProductCardHorizontal
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
    class="sw-product-card-horizontal"
    @click:wishlist="toggleWishlist"
    @click:add-to-cart="addToCart"
  />
</template>

<script>
import { SfProductCardHorizontal } from '@storefront-ui/vue'
import { useAddToCart } from '@shopware-pwa/composables'
import {
  getProductMainImageUrl,
  getProductRegularPrice,
  getProductUrl,
  getProductSpecialPrice,
  getProductName,
} from '@shopware-pwa/helpers'

export default {
  components: { SfProductCardHorizontal },
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
      return this.$i18n.path(getProductUrl(this.product))
    },
    getRegularPrice() {
      return getProductRegularPrice({ product: this.product })
    },
    getSpecialPrice() {
      return getProductSpecialPrice(this.product)
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
