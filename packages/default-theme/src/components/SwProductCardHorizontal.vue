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
      :is-in-wishlist="isInWishlist"
      :link="getRouterLink"
      class="sw-product-card-horizontal"
      @click:wishlist="toggleWishlist"
      @click:add-to-cart="addToCart"
      image-width="140"
      image-height="200"
    >
    <template #image>
        <SwImage
          :src="getImageUrl"
          :title="getName"
          :alt="getName"
          style="cursor:pointer;"
          width="140"
          height="200"
          :placeholder="getPlaceholderImage('140px','200px')"
          @click.native="$router.push(getRouterLink)"
        />
      </template>
    </SfProductCardHorizontal>
  </SwPluginSlot>
</template>

<script>
import { SfProductCardHorizontal } from "@storefront-ui/vue"
import { useAddToCart, useWishlist } from "@shopware-pwa/composables"
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
import getPlaceholderImage from "@/helpers/images/getPlaceholderImage.js"
import { usePriceFilter } from "@/logic/usePriceFilter.js"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import SwImage from "@/components/atoms/SwImage.vue"


export default {
  components: { SfProductCardHorizontal, SwPluginSlot, SwImage },
  setup(props, { root }) {
    const { addToCart, quantity, getStock, isInCart } = useAddToCart({
      product: props.product,
    })
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist({
      product: props.product
    })

    const toggleWishlist = () => !isInWishlist.value ? addToWishlist() : removeFromWishlist(props?.product?.id)

    return {
      quantity,
      addToCart,
      getStock,
      isInCart,
      filterPrice: usePriceFilter(),
      toggleWishlist,
      isInWishlist,
      getPlaceholderImage
    }
  },
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
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
}
</script>
<style lang="scss">
@import "@/assets/scss/variables";

.sw-product-card-horizontal {
  --image-width: 140px;
  --image-height: 200px;
  .sf-product-card-horizontal__main {
    @include for-mobile {
      button {
        position: absolute;
        top:0;
        right:var(--spacer-xs);
      }
    }
    }
  }
  
</style>
