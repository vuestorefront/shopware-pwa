<template>
  <div class="sw-product-heading">
    <slot name="heading" v-bind="name">
      <SfHeading
        :title="name"
        :level="3"
        class="sf-heading--no-underline sf-heading--left"
      />
    </slot>

    <div class="product-heading__sub">
      <slot name="price" v-bind="{ regularPrice, specialPrice }">
        <SfPrice
          :regular="filterPrice(regularPrice)"
          :special="filterPrice(specialPrice)"
          class="sf-price--big product-heading__sub-price"
        />
      </slot>

      <slot name="reviews" v-bind="reviews">
        <div class="product-heading__sub-rating">
          <SfRating :score="ratingAverage" :max="5" />
          <div class="product-heading__sub-reviews desktop-only">
            <a href="#reviews">{{ $tc("review", reviews.length, {count: reviews.length})}}</a>
          </div>
          <div class="product-heading__sub-reviews smartphone-only">
            ({{ reviews.length }})
          </div>
        </div>
      </slot>
    </div>

    <slot name="shippingFree" v-bind="shippingFree">
      <SfBadge
        v-if="shippingFree"
        class="sf-badge--number product-heading__shipping-badge"
      >
        {{ $t("Free shipping") }}
      </SfBadge>
    </slot>

    <SwTierPrices
      v-if="tierPrices && tierPrices.length"
      :tier-prices="tierPrices"
    />
  </div>
</template>

<script>
import {
  getProductFreeShipping,
  getProductReviews,
  getProductTierPrices,
  getProductRatingAverage,
  getProductCalculatedListingPrice,
  getProductCalculatedPrice,
  getProductPriceDiscount,
  getTranslatedProperty,
} from "@shopware-pwa/helpers"

import { SfBadge, SfHeading, SfPrice, SfRating } from "@storefront-ui/vue"

import SwTierPrices from "@/components/SwTierPrices.vue"
import { usePriceFilter } from "@/logic/usePriceFilter.js"

export default {
  name: "SwProductHeading",

  components: {
    SfBadge,
    SfHeading,
    SfPrice,
    SfRating,
    SwTierPrices,
  },

  props: {
    product: {
      required: true,
      type: Object,
    },
  },
  setup() {
    return {
      filterPrice: usePriceFilter(),
      getTranslatedProperty,
    }
  },

  computed: {
    name() {
      return getTranslatedProperty(this.product, "name")
    },
    ratingAverage() {
      return getProductRatingAverage(this.product)
    },

    reviews() {
      return getProductReviews({ product: this.product })
    },

    shippingFree() {
      return getProductFreeShipping(this.product)
    },
    regularPrice() {
      return (
        (this.tierPrices.length &&
          this.tierPrices[0] &&
          this.tierPrices[0].unitPrice) ||
        getProductCalculatedListingPrice(this.product)
      )
    },
    specialPrice() {
      return this.tierPrices.length
        ? undefined
        : getProductPriceDiscount(this.product) &&
            getProductCalculatedPrice(this.product)
    },

    tierPrices() {
      return getProductTierPrices(this.product)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/variables";

.product-heading {
  &__shipping-badge {
    background: var(--c-primary);
  }
  &__sub {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__sub-price {
    flex-basis: 100%;
    margin: var(--spacer-xs) 0;
    @include for-desktop {
      flex-basis: auto;
      margin-top: var(--spacer-base);
    }
  }
  &__sub-rating {
    display: flex;
    @include for-desktop {
      margin-left: auto;
    }
  }
  &__sub-reviews {
    margin-left: 10px;
    font-size: var(--font-size--xs);
  }
}
</style>
