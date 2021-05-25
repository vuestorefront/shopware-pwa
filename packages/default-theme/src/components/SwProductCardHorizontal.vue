<template>
  <SfProductCardHorizontal
    v-model="quantity"
    :title="getName"
    :image="getImageUrl"
    :special-price="getSpecialPrice | price"
    :regular-price="getRegularPrice | price"
    :max-rating="5"
    :score-rating="getProductRating"
    :is-on-wishlist="false"
    :link="getRouterLink"
    class="sw-product-card-horizontal"
    @click:wishlist="toggleWishlist"
    @click:add-to-cart="addToCart"
  />
</template>

<script>
import { SfProductCardHorizontal } from "@storefront-ui/vue"
import { useAddToCart } from "@shopware-pwa/composables"
import {
  getProductMainImageUrl,
  getProductRegularPrice,
  getProductUrl,
  getProductSpecialPrice,
  getProductName,
} from "@shopware-pwa/helpers"
import getResizedImage from "@/helpers/images/getResizedImage.js"

export default {
  components: { SfProductCardHorizontal },
  setup(props, { root }) {
    const { addToCart, quantity, getStock, isInCart } = useAddToCart(
      root,
      props.product
    )
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
      return this.$routing.getUrl(getProductUrl(this.product))
    },
    getRegularPrice() {
      return getProductRegularPrice(this.product)
    },
    getSpecialPrice() {
      return getProductSpecialPrice(this.product)
    },
    getImageUrl() {
      return getResizedImage(getProductMainImageUrl(this.product), {
        width: 140,
        height: 200,
      })
    },
  },
  methods: {
    async toggleWishlist() {},
  },
}
</script>
