<template>
  <div class="cms-element-product-slider">
    <SfSection :title-heading="title" class="section">
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
import SwProductCard from "@shopware-pwa/default-theme/components/SwProductCard"

export default {
  name: "CmsElementProductSlider",
  components: {
    SfSection,
    SfCarousel,
    SwProductCard,
  },
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    products() {
      return this.content && this.content.data ? this.content.data.products : []
    },
    title() {
      return this.content &&
        this.content.config &&
        this.content.config.title.value
        ? this.content.config.title.value
        : ""
    },
  },
  data(){
    return {
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
}
</script>

<style lang="scss" scoped>
@import "../settings.scss";

.cms-element-product-slider {
  width: 100%;
}
.product-carousel {
  &__product {
    @include for-mobile {
      max-width: unset;
    }
  }
}
</style>
