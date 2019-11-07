<template>
  <div class="sw-product-slider">
    <SfSection :title-heading="title" class="section">
      <SfCarousel class="product-carousel">
        <SfCarouselItem v-for="(productId, i) in products" :key="i">
          <SwIdProductCart :product-id="productId" />
        </SfCarouselItem>
      </SfCarousel>
    </SfSection>
  </div>
</template>

<script>
import { SfSection, SfCarousel } from "@storefront-ui/vue";
import SwIdProductCart from "../SwIdProductCart";

export default {
  components: {
    SfSection,
    SfCarousel,
    SwIdProductCart
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    products() {
      return this.content && this.content.config
        ? this.content.config.products.value
        : [];
    },
    title() {
      return this.content && this.content.config.title.value ? this.content.config.title.value : ""
    }
  }
};
</script>

<style lang="scss" scoped>
.sw-product-slider {
  width: 100%;
}
</style>
