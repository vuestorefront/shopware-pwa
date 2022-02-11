<template>
  <SwPluginSlot name="product-card-horizontal" :slot-context="product">
    <SfProductCardHorizontal
      v-model="quantity"
      :title="getName"
      :image="getImageUrl"
      :special-price="filterPrice(getSpecialPrice)"
      :regular-price="filterPrice(getRegularPrice)"
      :max-rating="5"
      :score-rating="getProductRating"
      :is-on-wishlist="false"
      :link="getRouterLink"
      class="sw-product-card-horizontal"
      @click:wishlist="toggleWishlist"
      @click:add-to-cart="addToCart"
    >
    <template #image>
        <SwImage
          :src="getImageUrl"
          :title="getName"
          :alt="getName"
          style="cursor:pointer;"
          width="200"
          height="400"
          @click.native="$router.push(getRouterLink)"
        />
      </template>
    </SfProductCardHorizontal>
  </SwPluginSlot>
</template>

<script>
import { SfProductCardHorizontal } from "@storefront-ui/vue"
import { useAddToCart } from "@shopware-pwa/composables"
import {
  getProductMainImageUrl,
  getProductTierPrices,
  getProductUrl,
  getProductCalculatedPrice,
  getProductCalculatedListingPrice,
  getProductPriceDiscount,
  getProductName,
} from "@shopware-pwa/helpers"
import getResizedImage from "@/helpers/images/getResizedImage.js"
import { usePriceFilter } from "@/logic/usePriceFilter.js"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import SwImage from "@/components/atoms/SwImage.vue"


export default {
  components: { SfProductCardHorizontal, SwPluginSlot, SwImage },
  setup(props, { root }) {
    const { addToCart, quantity, getStock, isInCart } = useAddToCart({
      product: props.product,
    })
    return {
      quantity,
      addToCart,
      getStock,
      isInCart,
      filterPrice: usePriceFilter(),
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
      return (
        (this.tierPrices.length &&
          this.tierPrices[0] &&
          this.tierPrices[0].unitPrice) ||
        getProductCalculatedListingPrice(this.product)
      )
    },
    getSpecialPrice() {
      return this.tierPrices.length
        ? undefined
        : getProductPriceDiscount(this.product) &&
            getProductCalculatedPrice(this.product)
    },
    tierPrices() {
      return getProductTierPrices(this.product)
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
<style lang="scss" scoped>
.sw-product-card-horizontal {
  overflow: hidden;
  --image-width: 200px;
  --image-height: 400px;
}
</style>
