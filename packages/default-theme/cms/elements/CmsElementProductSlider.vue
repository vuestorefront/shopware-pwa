<template>
  <div class="cms-element-product-slider">
    <SfSection :title-heading="title" class="section">
      <SfCarousel class="product-carousel">
        <SfCarouselItem v-for="product in products" :key="product.id">
          <SwProductCard :product="product" />
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
}
</script>

<style lang="scss" scoped>
@import "../settings.scss";

.cms-element-product-slider {
  width: 100%;
}
</style>
