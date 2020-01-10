<template>
  <div class="sw-product-list">
    <SfLoader
      :loading="loading">
      <div class="sw-product-list--wrapper" v-if="products.length && !loading">
        <div class="sw-product-list__list">
          <SwProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>
        <SfPagination
          class="sw-product-list__pagination desktop-only"
          :current="pagination.currentPage"
          :total="Math.ceil(pagination.total / pagination.perPage)"
          :visible="5"
          @click="changedPage"
        />
      </div>
      <SfHeading v-else title="No products found" subtitle="let us look for them"/>
    </SfLoader>
  </div>
</template>

<script>
import SwProductCard from '../../SwProductCard'
import { SfPagination, SfHeading, SfLoader } from '@storefront-ui/vue'
import { useProductListing } from '@shopware-pwa/composables'
export default {
  components: {
    SwProductCard,
    SfPagination,
    SfHeading,
    SfLoader
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  setup({ content }) {
    const propProducts = content.data.listing || []
    const { products, changePagination, pagination, loading } = useProductListing(propProducts)
    
    const changedPage = async (pageNumber) => {
      await changePagination(pageNumber)
    }

    return {
      products,
      changedPage,
      pagination,
      loading
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';
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
