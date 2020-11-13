<template>
  <div class="sw-products-gallery">
    <SfSection v-if="products && products.length > 4" class="section">
      <SfCarousel class="product-carousel" :settings="options" :style="style">
        <SfCarouselItem v-for="product in products" :key="product.id">
          <SwProductCard
            :product="product.product"
            class="product-carousel__product"
          />
        </SfCarouselItem>
      </SfCarousel>
    </SfSection>
    <SfSection v-else class="section products-grid">
      <div v-for="product in products" :key="product.id">
        <SwProductCard
          :product="product.product"
          class="product-carousel__product"
        />
      </div>
    </SfSection>
  </div>
</template>

<script>
import { SfSection, SfCarousel } from "@storefront-ui/vue"
import { getProducts } from "@shopware-pwa/shopware-6-client"
import SwProductCard from "@/components/SwProductCard"

export default {
  name: "SwProductCarousel",
  components: { SfSection, SfCarousel, SwProductCard },
  props: {
    titleHeading: {
      type: String,
      default: "Match it",
    },
    products: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options: {
        gap: 0,
        type: "carousel",
        perView: 4,
        rewind: true,
        slidePerPage: true,
        breakpoints: {
          1023: { perView: 2 },
        },
      },
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

.sw-products-gallery {
  // max-width: 1024px;

  .products-grid {
    ::v-deep .sf-section__content {
      display: flex;
      flex-wrap: wrap;
    }
  }
}

.product-carousel {
  // margin: 0 calc(var(--spacer-base) * -1) 0 0;

  // @include for-desktop {
  //   margin: var(--spacer-base) 0;
  //   --carousel-padding: var(--spacer-base);
  //   --carousel-max-width: calc(100% - 13.5rem);
  // }

  &__product {
    @include for-mobile {
      max-width: unset;
    }
  }
}
</style>
