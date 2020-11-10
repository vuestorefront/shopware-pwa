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
    :link="getRouterLink"
    class="sw-product-card"
    :show-add-to-cart-button="true"
    :is-added-to-cart="isInCart"
    :is-on-wishlist="isInWishlist"
    @click:add-to-cart="addToCart"
    @click:wishlist="toggleWishlistItem"
  >
  </SfProductCard>
</template>

<script>
import { SfProductCard } from "@storefront-ui/vue"
import { useAddToCart, useWishlist } from "@shopware-pwa/composables"
import {
  getProductThumbnailUrl,
  getProductRegularPrice,
  getProductUrl,
  getProductSpecialPrice,
  getProductName,
} from "@shopware-pwa/helpers"

export default {
  components: {
    SfProductCard,
  },
  setup({ product }, { root }) {
    const { addToCart, quantity, getStock, isInCart } = useAddToCart(
      root,
      product
    )
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist(
      root,
      product
    )
    return {
      quantity,
      addToCart,
      getStock,
      isInCart,
      toggleWishlistItem: () =>
        isInWishlist.value ? removeFromWishlist(product.id) : addToWishlist(),
      isInWishlist,
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
      return getProductRegularPrice(this.product)
    },
    getSpecialPrice() {
      return getProductSpecialPrice(this.product)
    },
    getImageUrl() {
      return (
        getProductThumbnailUrl(this.product) || require("@/assets/productB.jpg")
      )
    },
  },
}
</script>
