<template>
  <SfProductCard
    :title="getName"
    :image="getImageUrl"
    :special-price="getSpecialPrice"
    :regular-price="getRegularPrice"
    :max-rating="5"
    :score-rating="getProductRating"
    :image-width="700"
    :image-height="1000"
    :is-on-wishlist="false"
    :link="getRouterLink"
    class="products__product-card"
    :show-add-to-cart-button="true"
    :is-added-to-cart="isInCart"
    @click:wishlist="toggleWishlist"
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
  getProductSpecialPrice,
  getProductName
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
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
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
        getProductMainImageUrl(this.product) ||
        require('@shopware-pwa/default-theme/assets/productB.jpg')
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
  height: auto;
  width: 100%;

  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;

  &__title {
    font-family: var(--body-font-family-secondary);
    font-size: var(--font-size-regular-mobile);
    font-weight: 300;
    line-height: 1.6;
    margin: var(--spacer-small) 0;
    @include for-desktop {
      margin: var(--spacer) 0 var(--spacer-small);
      font-size: var(--font-size-regular-desktop);
    }
    &:hover {
      cursor: pointer;
      color: var(--c-gray);
    }
  }
}
</style>
