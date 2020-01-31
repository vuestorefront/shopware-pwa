<template>
  <div class="Sw-products-gallery">
    <SfSection title-heading="You may also like" v-if="products && products.length > 0">
      <SfCarousel class="product-carousel">
        <SfCarouselItem v-for="product in products" :key="product.id">
          <SwProductCard :product="product" />
        </SfCarouselItem>
      </SfCarousel>
    </SfSection>
  </div>
</template>

<script>
import { SfSection, SfCarousel } from '@storefront-ui/vue'
import { getProducts } from '@shopware-pwa/shopware-6-client'
import SwProductCard from './SwProductCard'

export default {
  name: 'SwProductCarousel',
  components: { SfSection, SfCarousel, SwProductCard },
  props: {
    titleHeading: {
      type: String,
      default: 'Match it'
    }
  },
  data() {
    return {
      products: {},
      
    }
  },
  async mounted() {
    const result = await getProducts(
    {
      sort: {
        field: 'price',
        desc: false
      },
      pagination: {
        page: 1,
        limit: 10
      }
    })
    this.products = result.data
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
