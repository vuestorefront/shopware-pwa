<template>
  <div class="sw-product-heading">
    <slot name="heading" v-bind="name">
      <SfHeading
        :title="name"
        :level="1"
        class="sf-heading--no-underline sf-heading--left"
      />
    </slot>
    <div class="product-details__sub">
      <slot name="price" v-bind="{ price, special }">
        <SfPrice
          :regular="`$${price}`"
          :special="special"
          class="sf-price--big product-details__sub-price"
        />
      </slot>
      <slot name="reviews" v-bind="reviews">
        <div v-if="reviews.length" class="product-details__sub-rating">
          <SfRating :score="ratingAverage" :max="5" />
          <div class="product-details__sub-reviews desktop-only">
            Read all {{ reviews.length }} review
          </div>
          <div class="product-details__sub-reviews mobile-only">
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
      type: Number,
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
