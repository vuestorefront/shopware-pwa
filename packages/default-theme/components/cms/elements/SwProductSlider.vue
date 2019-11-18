<template>
  <div class="sw-product-slider">
    <SfSection :title-heading="title" class="section">
      <SfCarousel class="product-carousel">
        <SfCarouselItem v-for="product in products" :key="product.id">
          <SwProductCart :product="product" />
        </SfCarouselItem>
      </SfCarousel>
    </SfSection>
  </div>
</template>

<script>
import { SfSection, SfCarousel } from "@storefront-ui/vue";
import SwProductCart from "../../SwProductCart";

export default {
  components: {
    SfSection,
    SfCarousel,
    SwProductCart
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    products() {
      return this.content && this.content.data
        ? this.content.data.products
        : [];
    },
    title() {
      return this.content && this.content.config.title.value
        ? this.content.config.title.value
        : "";
    }
  }
};
</script>

<style lang="scss" scoped>
.sw-product-slider {
  width: 100%;
}
</style>
