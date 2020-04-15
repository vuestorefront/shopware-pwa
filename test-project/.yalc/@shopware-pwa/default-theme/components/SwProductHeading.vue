<template>
  <div class="sw-product-heading">
    <slot name="heading" v-bind="name">
      <SfHeading
        :title="name"
        :level="1"
        class="sf-heading--no-underline sf-heading--left"
      />
    </slot>
    <div class="product-heading__sub">
      <slot name="price" v-bind="{ price, special }">
        <SfPrice
          :regular="`${price}`"
          :special="special"
          class="sf-price--big product-heading__sub-price"
        />
      </slot>
      <slot name="reviews" v-bind="reviews">
        <div v-if="reviews.length" class="product-heading__sub-rating">
          <SfRating :score="ratingAverage" :max="5" />
          <div class="product-heading__sub-reviews desktop-only">
            Read all {{ reviews.length }} review
          </div>
          <div class="product-heading__sub-reviews mobile-only">
            ({{ reviews.length }})
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import { SfHeading, SfPrice, SfRating } from '@storefront-ui/vue'

export default {
  name: 'SwProductHeading',
  components: { SfHeading, SfPrice, SfRating },
  props: {
    reviews: {
      type: Array,
      default: () => []
    },
    price: {
      type: [Number, String],
      default: 0
    },
    special: {
      type: [Number, String],
      default: 0
    },
    ratingAverage: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/shared/styles/variables';

.product-heading {
  &__sub {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__sub-price {
    --price-font-size: 1.5rem;
    flex-basis: 100%;
    margin-top: calc(var(--spacer-big) / 4);
    @include for-desktop {
      flex-basis: auto;
      margin-top: calc(var(--spacer-big) / 2);
    }
  }
  &__sub-rating {
    display: flex;
    margin-top: calc(var(--spacer-big) / 2);
    @include for-desktop {
      margin-left: auto;
    }
  }
  &__sub-reviews {
    margin-left: 10px;
    font-size: 0.75rem;
  }
}
</style>
