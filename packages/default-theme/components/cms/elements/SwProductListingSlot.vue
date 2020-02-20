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
          <div class="sw-product-list__place-holder"/>
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
@mixin for-desktop-big {
  @media screen and (min-width: 1325px) {
    @content;
  }
}

@mixin for-desktop {
  @media screen and (min-width: 1023px) {
    @content;
  }
}

@mixin for-desktop-small {
  @media screen and (min-width: 980px) {
    @content
  }
}

@mixin for-tablet {
  @media screen and (min-width: 754px) {
    @content
  }
}

@mixin for-phone {
  @media screen and (min-width: 374px) {
    @content
  }
}

.sw-product-list {
  display: flex;
  justify-content: center;

  ::v-deep &__wrapper {
    display: flex;
    flex-direction: column;
  }

  &__list {
    display: flex;
    width: 100%;
    flex-flow: row wrap;
  }

  &__place-holder {
    flex: 1 0 75%;
  }

  ::v-deep &__product-card {
    flex: 1 0 75%;

    padding: $spacer;
    @include for-phone {
      flex: 1 0 50%;
      padding: $spacer
    }

    @include for-tablet {
      flex: 1 0 33%;
      padding: $spacer
    }

    @include for-desktop-small {
      flex: 1 0 25%;
      padding: $spacer;
    }

    @include for-desktop {
      flex: 1 0 25%;
      padding: $spacer;
    }
    @include for-desktop-big {
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

::v-deep .sf-product-card {
  max-width: none !important;
  @include for-tablet {
    max-width: 264px !important;
  }
  @include for-desktop-small {
    max-width: 240px !important;
  }
  @include for-desktop {
    max-width: 190px !important;
  }
  @include for-desktop-big {
    max-width: 264px !important;
  }
}

::v-deep .sf-loader {
  width: 100%;
  display: flex;
}
</style>
