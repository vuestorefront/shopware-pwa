<template>
  <div class="cms-element-product-listing">
    <SfLoader :loading="loading" class="cms-element-product-listing__loader" />
    <div v-if="getElements.length" class="cms-element-product-listing__wrapper">
      <transition-group
        tag="div"
        appear
        name="cms-element-product-listing__slide"
        class="cms-element-product-listing__list"
        :class="{ 'cms-element-product-listing__list--blur': loading }"
      >
        <template v-if="!isListView">
          <SwProductCard
            v-for="(product, i) in getElements"
            :key="product.id"
            class="cms-element-product-listing__product-card"
            :product="product"
            :style="{ '--index': i }"
          />
        </template>
        <template v-else>
          <SwProductCardHorizontal
            v-for="(product, i) in getElements"
            :key="product.id"
            class="cms-element-product-listing__product-card-horizontal"
            :product="product"
            :style="{ '--index': i }"
          />
        </template>
        <div key="holder" class="cms-element-product-listing__place-holder" />
      </transition-group>
      <SfPagination
        v-if="getCurrentPage && !isListView"
        class="cms-element-product-listing__pagination"
        :current="getCurrentPage"
        :total="getTotalPagesCount"
        :visible="5"
        pageParamName="p"
        @click="changePage"
      >
        <template #prev>
          <span
            class="cms-element-product-listing__pagination__number"
            @click="changePage(getCurrentPage - 1)"
          >
            &lt;
          </span>
        </template>
        <template #number="{ page }">
          <span
            class="cms-element-product-listing__pagination__number"
            :style="{
              'font-weight': getCurrentPage === page ? 700 : 300,
            }"
            @click="changePage(page)"
          >
            {{ page }}
          </span>
        </template>
        <template #next>
          <span
            :class="{ 'next-disabled': getCurrentPage === getTotalPagesCount }"
            class="cms-element-product-listing__pagination__number"
            @click="changePage(getCurrentPage + 1)"
          >
            &gt;
          </span>
        </template>
      </SfPagination>
      <div v-else-if="getCurrentPage < getTotalPagesCount" class="load-more">
        <SwButton
          class="sf-button--outline"
          @click="loadMore"
          :disabled="loadingMore"
        >
          {{ $t("load more") }}...
        </SwButton>
      </div>
    </div>
    <SfHeading
      v-else-if="!loading && !getElements.length"
      :title="$t('No products found')"
      :description="$t('let us look for them')"
    />
  </div>
</template>

<script>
import { SfPagination, SfHeading, SfLoader } from "@storefront-ui/vue"
import { useUIState, useListing } from "@shopware-pwa/composables"
import { watch } from "@vue/composition-api"
const SwProductCard = () => import("@/components/SwProductCard.vue")
const SwButton = () => import("@/components/atoms/SwButton.vue")
const SwProductCardHorizontal = () =>
  import("@/components/SwProductCardHorizontal.vue")

export default {
  name: "SwProductListing",
  components: {
    SwProductCardHorizontal,
    SwProductCard,
    SfPagination,
    SfHeading,
    SfLoader,
    SwButton,
  },
  props: {
    initialListing: {
      type: Object,
      default: null,
    },
    listingType: {
      type: String,
      default: "categoryListing",
    },
  },
  setup(props, { root }) {
    const {
      getElements,
      setInitialListing,
      getCurrentPage,
      changeCurrentPage,
      getTotalPagesCount,
      loading,
      loadMore,
      loadingMore,
    } = useListing(root, props.listingType)

    if (props.initialListing) {
      setInitialListing(props.initialListing)
      watch(
        () => props.initialListing,
        () => {
          const initialListing = props.initialListing || []
          setInitialListing(initialListing)
        }
      )
    }

    const { isOpen: isListView } = useUIState(root, "PRODUCT_LISTING_STATE")

    const changePage = async (pageNumber) => {
      if (pageNumber > getTotalPagesCount.value) {
        return
      }
      window.scrollTo(0, 0)
      await changeCurrentPage(pageNumber)
    }

    return {
      changePage,
      getTotalPagesCount,
      loading,
      isListView,
      getElements,
      getCurrentPage,
      loadMore,
      loadingMore,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/cms/settings.scss";

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

.load-more {
  display: flex;
  justify-content: center;
}

.cms-element-product-listing {
  display: flex;
  justify-content: center;
  position: relative;
  min-height: var(--spacer-xl);

  &__loader {
    margin-top: var(--spacer-sm);
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
    @include for-desktop {
      padding: 0 var(--spacer-sm);
    }
  }

  &__list {
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    transition: filter 0.1s ease-in;
    margin-top: var(--spacer-sm);
    &--blur {
      filter: blur(10px);
    }
  }

  ::v-deep &__product-card {
    flex: 1 0 50%;
    --product-card-padding: var(--spacer-xs);
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
    @include for-mobile {
      ::v-deep .sf-image {
        --image-width: 5.3125rem;
        --image-height: auto;
      }
    }
  }
  &__pagination {
    margin: auto;
    @include for-desktop-small {
      display: flex;
      justify-content: center;
      margin-top: var(--spacer-base);
    }

    &__number {
      margin: 0 5px;
      cursor: pointer;
    }

    .next-disabled {
      display: none;
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
