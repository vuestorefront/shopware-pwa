<template>
  <SfSection :title-heading="titleHeading" class="section">
    <!-- SwProductSlider should be placed here instead of SfCarousel-->
    <SfCarousel class="product-carousel">
      <SfCarouselItem v-for="(product, i) in products" :key="i">
        <SfProductCard
          :title="product.title"
          :image="product.image"
          :regular-price="product.price.regular"
          :max-rating="product.rating.max"
          :score-rating="product.rating.score"
          :is-on-wishlist="product.isOnWishlist"
          @click:wishlist="toggleWishlist(i)"
          class="product-card"
        />
      </SfCarouselItem>
    </SfCarousel>
  </SfSection>
</template>

<script>
import { SfSection, SfCarousel, SfProductCard } from '@storefront-ui/vue'
import SwProductSlider from './cms/elements/SwProductSlider'

export default {
  name: 'SwProductCarousel',
  components: { SfSection, SfCarousel, SfProductCard },
  props: {
    titleHeading: {
      type: String,
      default: 'Match it'
    }
  },
  data() {
    return {
      products: [
        {
          title: 'Cream Beach Bag',
          image: '/img/productA.png',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: true
        },
        {
          title: 'Cream Beach Bag',
          image: '/img/productB.png',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/img/productC.png',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/img/productA.png',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/img/productB.png',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/img/productC.png',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/img/productA.png',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/img/productB.png',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/shared/styles/variables';

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}

.section {
  padding-left: $spacer-big;
  padding-right: $spacer-big;
  @include for-desktop {
    padding-left: 0;
    padding-right: 0;
  }
}

.product-carousel {
  margin: -20px -#{$spacer-big} -20px 0;
  @include for-desktop {
    margin: -20px 0;
  }
  ::v-deep .sf-carousel__wrapper {
    padding: 20px 0;
    @include for-desktop {
      padding: 20px;
      max-width: calc(100% - 216px);
    }
  }
}
</style>