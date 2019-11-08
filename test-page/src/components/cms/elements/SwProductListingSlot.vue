<template>
  <div class="sw-product-list">
    <div class="sw-product-list__list" v-if="products">
      <SwProductCart
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
</template>

<script>
import SwProductCart from "../../SwProductCart";
import { SfPagination } from "@storefront-ui/vue";
export default {
  components: {
    SwProductCart,
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
  box-sizing: border-box;
  flex: 1;
  margin: 0 -#{$spacer};
  @include for-desktop {
    margin: $spacer-big;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1.875rem - 0.5rem;
  }
  &__product-card {
    flex: 0 0 50%;
    padding: $spacer;
    @include for-desktop {
      flex: 0 0 25%;
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
