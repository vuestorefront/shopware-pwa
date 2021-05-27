<template>
  <div class="sw-products-gallery">
    <SfSection v-if="products && products.length > 4" class="section">
      <SfCarousel class="product-carousel" :settings="options" :style="style">
        <SfCarouselItem v-for="product in products" :key="product.id">
          <SwProductCard :product="product" class="product-carousel__product" />
        </SfCarouselItem>
      </SfCarousel>
    </SfSection>
    <SfSection v-else class="section products-grid">
      <div v-for="product in products" :key="product.id">
        <SwProductCard :product="product" class="product-carousel__product" />
      </div>
    </SfSection>
  </div>
</template>

<script>
import { SfSection, SfCarousel } from "@storefront-ui/vue"
import SwProductCard from "@/components/SwProductCard.vue"

export default {
  name: "SwProductCarousel",
  components: { SfSection, SfCarousel, SwProductCard },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      style: {},
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
  min-height: 450px;

  .products-grid {
    ::v-deep .sf-section__content {
      display: flex;
      flex-wrap: wrap;
      margin-top: 0;
    }
  }
  .sf-section {
    margin-top: 0;
    margin-bottom: 0;
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
