<template>
  <SfProductCard
    :title="getName"
    :image="getImageUrl"
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
    
  >
    <template #image>
      <SfImage
        class="sw-product-card__image"
        :class="{'sw-product-card__image--new': getIsNew}"
        :src="getImageUrl"
        :alt="getName" 
      />
    </template>
    <template #wishlist-icon>
      <span></span>
    </template>
    <template #add-to-cart>
      <SfButton class="sf-button--full-width color-secondary sw-product-card__button" @click="addToCart">
        Add to shoping cart
      </SfButton>
    </template>
    <template #title>
      <SfHeading :level="3" :title="getName" class="sw-product-card__heading"/>
    </template>
    <template #reviews>
      <div v-html="getDescription" class="sw-product-card__description"></div>
    </template>
    <template #price>
      <SfPrice
        class="sf-product-card__price sw-product-card__price"
        :regular="getSpecialPrice ? getSpecialPrice : getRegularPrice | price"
      />
    </template>
  </SfProductCard>
</template>

<script>
import { SfProductCard, SfAddToCart, SfImage, SfButton, SfHeading, SfLink, SfPrice } from '@storefront-ui/vue'
import { useAddToCart } from '@shopware-pwa/composables'
import {
  getProductMainImageUrl,
  getProductRegularPrice,
  getProductUrl,
  getProductSpecialPrice,
  getProductName,
  get
} from '@shopware-pwa/helpers'

export default {
  components: {
    SfProductCard,
    SfAddToCart,
    SfImage,
    SfButton,
    SfHeading,
    SfLink,
    SfPrice
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
      return regular
    },
    getSpecialPrice() {
      // TODO: remove that logic once the SW6 API returns right data
      // related: https://github.com/DivanteLtd/shopware-pwa/issues/263
      const special = getProductSpecialPrice(this.product)
      return special
    },
    getImageUrl() {
      return (
        getProductMainImageUrl(this.product) ||
        require('@shopware-pwa/default-theme/assets/productB.jpg')
      )
    },
    getDescription() {
      return (
        this.product &&
        (this.product.description ||
          (this.product.translated && this.product.translated.description))
      )
    },
    getIsNew() {
      return (
        this.product && this.product.isNew
      )
    },
  },
  methods: {
    async toggleWishlist() {},
  },
}
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';

.sw-product-card {
  --product-card-max-width: 100%;
  
  position: relative;
  padding-bottom: 94px;
  &__image {
    img {
      width: 100%;
      height: 200px;
      object-fit: contain;
    }
  } 
  &__image--new {
    position: relative;
    &::after {
      content: 'NEW';
      position: absolute;
      top: 0;
      left: 0;
      height: 32px;
      display: flex;
      align-items: center;
      background-color: #7dd897;
      color: #fff;
      padding: 0 8px;
      font-weight: 700;
    }
  } 
  &::after {
    --product-card-box-shadow: none;
  }
  &__description {
    height: 54px;
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 62px;
    font-size: 14px;
    line-height: 18px;
  }
  &__button {
    position: absolute;
    bottom: 0;
    --button-text-transform: none;
  }
  &__heading {
    --heading-text-align: start;
  }
  &__price {
    --price-color: var(--c-danger);
    position: absolute;
    bottom: 64px
  }
}
</style>
