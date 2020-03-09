<template>
  <div class="Sw-products-gallery">
    <SfSection
      v-if="products && products.length > 0"
      class="section"
      title-heading="You may also like"
    >
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
import SwProductCard from '@shopware-pwa/default-theme/components/SwProductCard'

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
      products: {}
    }
  },
  async mounted() {
    const result = await getProducts({
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
@import '~@storefront-ui/vue/styles';

.section {
  padding: 0 var(--spacer-big);
  @include for-desktop {
    padding: 0;
  }
}

.product-carousel {
  margin: 0 calc(var(--spacer-big) * -1) 0 0;
  @include for-desktop {
    margin: var(--spacer-big) 0;
    --carousel-padding: var(--spacer-big);
    --carousel-max-width: calc(100% - 13.5rem);
  }
}
</style>
