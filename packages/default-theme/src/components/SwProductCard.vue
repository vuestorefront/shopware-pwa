<template>
  <SwPluginSlot
    name="product-card"
    :slot-context="product"
    style="display: contents"
  >
    <SfProductCard
      :title="getName"
      :image="getImageUrl"
      :special-price="getSpecialPrice && displayPricePrefix"
      :regular-price="getRegularPrice && displayPricePrefix"
      :max-rating="5"
      :score-rating="getProductRating"
      image-width="100%"
      image-height="400"
      :link="getRouterLink"
      class="sw-product-card"
      :show-add-to-cart-button="true"
      :is-added-to-cart="isInCart"
      :is-in-wishlist="isInWishlist"
      @click:add-to-cart="addToCart"
      @click:wishlist="toggleWishlistItem"
      data-testid="product-card"
    >
      <template #image>
        <SwImage
          :src="getImageUrl"
          :title="getName"
          :alt="getName"
          style="cursor: pointer"
          width="200"
          height="400"
          @click.native="$router.push(getRouterLink)"
        />
      </template>
    </SfProductCard>
  </SwPluginSlot>
</template>

<script>
import { SfProductCard } from "@storefront-ui/vue"
import { useAddToCart, useWishlist } from "@shopware-pwa/composables"
import {
  getProductThumbnailUrl,
  getProductTierPrices,
  getProductUrl,
  getProductName,
  getProductCalculatedPrice,
  getProductCalculatedListingPrice,
  getProductPriceDiscount,
} from "@shopware-pwa/helpers"
import getResizedImage from "@/helpers/images/getResizedImage.js"
import { toRefs, computed } from "@vue/composition-api"
import { usePriceFilter } from "@/logic/usePriceFilter.js"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import SwImage from "@/components/atoms/SwImage.vue"

export default {
  components: {
    SfProductCard,
    SwPluginSlot,
    SwImage,
  },
  setup(props) {
    const { product } = toRefs(props)
    const { addToCart, quantity, getStock, isInCart } = useAddToCart({
      product,
    })
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist({
      product,
    })
  // TODO:
  // - move product price logic to separate composable like useProductPrice
  // - add translation
  // - test against variants
  // - consider not using special price label
  // - mix both cases: show variants and from in one container

    const cheapestPrice = computed(() => product.value?.calculatedCheapestPrice)
    const realPrice = computed(() => {
      const real = product.value?.calculatedPrice
      if (product.value?.calculatedPrices?.length > 1) {
        return product.value?.calculatedPrices[product.value?.calculatedPrices.length-1]
      }
      return real;
    })

    const displayFromPriceLabel = computed(() => product.value?.calculatedPrices?.length > 0);
    const referencePrice = computed(() => realPrice.value?.referencePrice);

    const displayPricePrefix = computed(() => {
      if (cheapestPrice.value?.unitPrice != realPrice.value?.unitPrice) {
        return `Variants from ${cheapestPrice.value?.unitPrice}`
      }
      if (displayFromPriceLabel.value) {
        return `From ${realPrice.value?.unitPrice}`
      }
    })

    return {
      cheapestPrice,
      realPrice,
      quantity,
      addToCart,
      getStock,
      isInCart,
      toggleWishlistItem: () =>
        isInWishlist.value
          ? removeFromWishlist(product.value.id)
          : addToWishlist(),
      isInWishlist,
      formatPrice: usePriceFilter(),
      displayPricePrefix
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
      return getResizedImage(getProductThumbnailUrl(this.product), {
        width: 200,
        height: 400,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.sw-product-card {
  overflow: hidden;
  --image-width: 200px;
  --image-height: 400px;
}
</style>
