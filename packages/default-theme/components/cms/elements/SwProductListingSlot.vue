<template>
  <div class="sw-product-list">
    <SfLoader :loading="loading">
      <div class="sw-product-list__wrapper" v-if="products.length && !loading">
        <div class="sw-product-list__list">
          <SwProductCard
            class="sw-product-list__product-card"
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
      <SfHeading
        v-else
        title="No products found"
        subtitle="let us look for them"
      />
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
    const {
      products,
      changePagination,
      pagination,
      loading
    } = useProductListing(propProducts)

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
@mixin for-tablet {
  @media screen and (min-width: 600px) {
    @content;
  }
}

::v-deep .sf-loader {
  width: 80%;
  display: flex;
  flex-basis: 200px;
  flex-grow: 1;
}

.sw-product-list {
  display: flex;
  justify-content: center;
  flex-basis: 200px;
  flex-grow: 1;

  ::v-deep &__wrapper {
    display: flex;
    flex-direction: column;
    flex-basis: 200px;
    flex-grow: 1;
  }

  &__list {
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    flex-basis: 200px;
  }

  ::v-deep &__product-card {
    flex: 1 0 75%;
    padding: $spacer;
    @include for-tablet {
      flex: 1 0 50%;
      padding: $spacer;
    }
    @include for-desktop {
      flex: 1 0 25%;
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

<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}

.sf-product-card {
  max-width: none !important;
  @include for-desktop {
    max-width: 300px !important;
  }
}
</style>
