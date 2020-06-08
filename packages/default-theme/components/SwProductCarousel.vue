<template>
  <div class="Sw-products-gallery">
    <SfSection
      v-if="products && products.length > 0"
      class="section"
      title-heading="You may also like"
    >
      <SfCarousel class="product-carousel" :settings="options">
        <SfCarouselItem v-for="product in products" :key="product.id">
          <SwProductCard :product="product" class="product-carousel__product" />
        </SfCarouselItem>
      </SfCarousel>
    </SfSection>
  </div>
</template>

<script>
import { SfSection, SfCarousel } from "@storefront-ui/vue"
import { getProducts } from "@shopware-pwa/shopware-6-client"
import SwProductCard from "@shopware-pwa/default-theme/components/SwProductCard"

export default {
  name: "SwProductCarousel",
  components: { SfSection, SfCarousel, SwProductCard },
  props: {
    titleHeading: {
      type: String,
      default: "Match it",
    },
  },
  data() {
    return {
      products: {},
      options: {
        breakpoints: {
          480: {
            perView: 2,
            peek: {
              before: 0,
              after: 50,
            },
          },
          1023: {
            perView: 4,
          },
        },
      }
    }
  },
  async mounted() {
    try {
      const result = await getProducts({
        sort: {
          field: "price",
          desc: false,
        },
        pagination: {
          page: 1,
          limit: 10,
        },
      })
      this.products = result.data
    } catch (e) {
      console.error("SwProductCarousel:mounted:getProducts", e)
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.section {
  padding: 0 var(--spacer-base);
  @include for-desktop {
    padding: 0;
  }
}

.product-carousel {
  margin: 0 calc(var(--spacer-base) * -1) 0 0;
  @include for-desktop {
    margin: var(--spacer-base) 0;
    --carousel-padding: var(--spacer-base);
    --carousel-max-width: calc(100% - 13.5rem);
  }
  &__product {
    @include for-mobile {
      max-width: unset;
    }
  }
}
</style>
