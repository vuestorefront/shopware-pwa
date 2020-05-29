<template>
  <div class="cms-element-product-listing">
    <SfLoader :loading="loading" class="cms-element-product-listing__loader" />
    <div v-if="products.length" class="cms-element-product-listing__wrapper">
      <transition-group
        tag="div"
        appear
        name="cms-element-product-listing__slide"
        class="cms-element-product-listing__list"
        :class="{ 'cms-element-product-listing__list--blur': loading }"
      >
        <template v-if="!isListView">
          <SwProductCard
            v-for="(product, i) in products"
            :key="product.id"
            class="cms-element-product-listing__product-card"
            :product="product"
            :style="{ '--index': i }"
          />
        </template>
        <template v-else>
          <SwProductCardHorizontal
            v-for="(product, i) in products"
            :key="product.id"
            class="cms-element-product-listing__product-card-horizontal"
            :product="product"
            :style="{ '--index': i }"
          />
        </template>
        <div key="holder" class="cms-element-product-listing__place-holder" />
      </transition-group>
      <SfPagination
        v-if="pagination && pagination.currentPage"
        class="cms-element-product-listing__pagination"
        :current="pagination.currentPage"
        :total="Math.ceil(pagination.total / pagination.perPage)"
        :visible="5"
        @click="changePage"
      >
        <template #prev>
          <span
            class="cms-element-product-listing__pagination__number"
            @click="changePage(pagination.currentPage - 1)"
          >
            &lt;
          </span>
        </template>
        <template #number="{page}">
          <span
            class="cms-element-product-listing__pagination__number"
            v-bind:style="{
              'font-weight': pagination.currentPage === page ? 700 : 300,
            }"
            @click="changePage(page)"
          >
            {{ page }}
          </span>
        </template>
        <template #next>
          <span
            class="cms-element-product-listing__pagination__number"
            @click="changePage(pagination.currentPage + 1)"
          >
            &gt;
          </span>
        </template>
      </SfPagination>
    </div>
    <SfHeading
      v-else
      title="No products found"
      subtitle="let us look for them"
    />
  </div>
</template>

<script>
import SwProductCard from '@shopware-pwa/default-theme/components/SwProductCard'
import SwProductCardHorizontal from '@shopware-pwa/default-theme/components/SwProductCardHorizontal'
import { SfPagination, SfHeading, SfLoader } from '@storefront-ui/vue'
export default {
  name: 'SwProductListing',
  components: {
    SwProductCardHorizontal,
    SwProductCard,
    SfPagination,
    SfHeading,
    SfLoader,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    isListView: {
      type: Boolean,
      default: false,
    },
    listing: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    products() {
      return (this.listing && this.listing.elements) || []
    },
    pagination() {
      return (
        this.listing && {
          currentPage: this.listing.page,
          perPage: this.listing.limit,
          total: this.listing.total,
        }
      )
    },
  },
  methods: {
    changePage(page) {
      this.$emit('change-page', page)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../cms/settings.scss';

// additional screen variables
$desktop-big: 1200px;
$desktop: 1024px;
$desktop-small: 900px;
$tablet: 768px;
$tablet-small: 600px;
$phone: 480px;
// max photo width
$mx-photo-wth-5: 20%;
$mx-photo-wth-4: 25%;
$mx-photo-wth-3: 33%;
$mx-photo-wth-2: 50%;
$mx-photo-wth-1: 75%;
// product cards - limit in column
$col-prod-5: 1 0 $mx-photo-wth-5;
$col-prod-4: 1 0 $mx-photo-wth-4;
$col-prod-3: 1 0 $mx-photo-wth-3;
$col-prod-2: 1 0 $mx-photo-wth-2;
$col-prod-1: 1 0 $mx-photo-wth-1;

@mixin for-desktop-big {
  @media screen and (min-width: $desktop-big) {
    @content;
  }
}

@mixin for-desktop {
  @media screen and (min-width: $desktop) {
    @content;
  }
}

@mixin for-desktop-small {
  @media screen and (min-width: $desktop-small) {
    @content;
  }
}

@mixin for-tablet {
  @media screen and (min-width: $tablet) {
    @content;
  }
}

@mixin for-tablet-small {
  @media screen and (min-width: $tablet-small) {
    @content;
  }
}

@mixin for-phone {
  @media screen and (min-width: $phone) {
    @content;
  }
}

.cms-element-product-listing {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;

  &__loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    --loader-overlay-background: transparent;
    width: 38px;
    height: 38px;
    z-index: 2;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 var(--spacer-xs);
    @include for-desktop {
      padding: 0 var(--spacer-sm);
    }
  }

  &__list {
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    transition: filter 0.1s ease-in;
    &--blur {
      filter: blur(10px);
    }
  }

  ::v-deep &__product-card {
    flex: 1 0 50%;
    padding: var(--spacer-xs);

    @include for-phone {
      flex: $col-prod-3;
      padding: var(--spacer-xs);
    }

    @include for-tablet-small {
      flex: $col-prod-3;
      padding: var(--spacer-xs);
    }

    @include for-tablet {
      flex: $col-prod-4;
      padding: var(--spacer-xs);
    }

    @include for-desktop-small {
      flex: $col-prod-4;
      padding: var(--spacer-xs);
    }

    @include for-desktop {
      flex: $col-prod-4;
      padding: var(--spacer-xs);
    }

    @include for-desktop-big {
      flex: $col-prod-5;
      padding: var(--spacer-base);
    }
  }
  &__product-card-horizontal {
    flex: 0 0 100%;
    @include for-desktop-small {
      margin: var(--spacer-sm) 0;
    }
  }
  &__pagination {
    @include for-desktop-small {
      display: flex;
      justify-content: center;
      margin-top: var(--spacer-base);
    }

    &__number {
      margin: 0 5px;
      cursor: pointer;
    }
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
}
.section {
  @media (max-width: $desktop-min) {
    padding-left: var(--spacer-base);
    padding-right: var(--spacer-base);
  }
}
::v-deep .sf-product-card {
  max-width: $mx-photo-wth-2 !important;

  @include for-phone {
    max-width: $mx-photo-wth-3 !important;
  }

  @include for-tablet-small {
    max-width: $mx-photo-wth-3 !important;
  }

  @include for-tablet {
    max-width: $mx-photo-wth-4 !important;
  }

  @include for-desktop-small {
    max-width: $mx-photo-wth-4 !important;
  }

  @include for-desktop {
    max-width: $mx-photo-wth-4 !important;
  }

  @include for-desktop-big {
    max-width: $mx-photo-wth-5 !important;
  }
}
</style>
