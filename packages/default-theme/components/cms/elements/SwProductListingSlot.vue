<template>
  <div class="sw-product-list">
    <div class="sw-product-list--wrapper">
      <div class="sw-product-list__list">
        <SwProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          />
      </div>
      <SfPagination
        class="sw-product-list__pagination desktop-only"
        :current="1"
        :total="5"
        :visible="5"
        />
    </div>
  </div>
</template>

<script>
import SwProductCard from "../../SwProductCard";
import { SfPagination } from "@storefront-ui/vue";
export default {
  components: {
    SwProductCard,
    SfPagination
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    products() {
      return this.content.data.listing || [];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles.scss";
@import "~@storefront-ui/shared/styles/helpers/visibility";
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
.sw-product-list {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0 -#{$spacer};
  @include for-desktop {
    margin: $spacer-big;
  }
  
  &__list {
    width: auto;
    flex-wrap: wrap;
    display: flex;
  }

  &__product-card {
    padding: $spacer;
    @include for-desktop {
      padding: $spacer-big;
    }
  }
  &__pagination {
    @include for-desktop {
      display: flex;
      justify-content: center;
      margin-top: $spacer-extra-big;
    }
  }
}
.section {
  @media (max-width: $desktop-min) {
    padding-left: $spacer-big;
    padding-right: $spacer-big;
  }
}
</style>
