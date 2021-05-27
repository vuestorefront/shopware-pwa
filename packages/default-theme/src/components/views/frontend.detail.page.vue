<template>
  <div v-if="!cmsPage" id="product">
    <SwPluginSlot name="product-page-details-before" :slot-context="product" />
    <SwGoBackArrow class="product-page-back" />
    <div class="sw-product-buy-box" v-if="product">
      <SwProductGallery
        :product="product"
        class="sw-product-buy-box__gallery"
      />
      <div class="sw-product-buy-box__description">
        <SwProductDetails :product="product" />
      </div>
    </div>
    <CmsElementProductDescriptionReviews />

    <SwPluginSlot name="product-page-details-after" :slot-context="product" />

    <SwProductCrossSells :product="product" />

    <div class="product__advertisement">
      <SwProductAdvertisement />
    </div>
  </div>
  <div v-else>
    <CmsPage :content="cmsPage" />
  </div>
</template>
<script>
import CmsPage from "sw-cms/CmsPage"
import { useUser, useUIState, useDefaults } from "@shopware-pwa/composables"
import SwGoBackArrow from "@/components/atoms/SwGoBackArrow.vue"
import SwProductAdvertisement from "@/components/SwProductAdvertisement.vue"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import { computed, onMounted, ref } from "@vue/composition-api"
const SwProductGallery = () => import("@/components/SwProductGallery.vue")
const SwProductDetails = () => import("@/components/SwProductDetails.vue")
const SwProductCrossSells = () =>
  import("@/components/organisms/SwProductCrossSells.vue")
const CmsElementProductDescriptionReviews = () =>
  import("@/cms/elements/CmsElementProductDescriptionReviews.vue")

export default {
  name: "ProductPage",
  components: {
    CmsPage,
    SwGoBackArrow,
    SwProductGallery,
    SwProductDetails,
    SwProductAdvertisement,
    SwPluginSlot,
    SwProductCrossSells,
    CmsElementProductDescriptionReviews,
  },
  props: {
    page: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { root }) {
    const { isLoggedIn } = useUser(root)
    const { switchState: switchLoginModalState } = useUIState(
      root,
      "LOGIN_MODAL_STATE"
    )
    const product = computed(() => props.page.product)
    const cmsPage = computed(() => props.page.cmsPage)
    const { getIncludesConfig } = useDefaults(root, "useProductListing")

    return {
      isLoggedIn,
      switchLoginModalState,
      product,
      cmsPage,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

@mixin for-iOS {
  @supports (-webkit-overflow-scrolling: touch) {
    @content;
  }
}

#product {
  position: relative;

  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}

.section {
  padding: 0 var(--spacer-base);
  @include for-desktop {
    padding: 0;
  }
}

.images-grid {
  ::v-deep .sf-image {
    max-width: 100%;
  }
  &__row {
    display: flex;
    & + & {
      margin-top: calc(var(--spacer-base) / 2);
      @include for-desktop {
        margin-top: var(--spacer-base);
      }
    }
  }
  &__col {
    margin: 0;
    & + & {
      margin-left: calc(var(--spacer-base) / 2);
      @include for-desktop {
        margin-left: var(--spacer-base);
      }
    }
  }
}

.product {
  @include for-desktop {
    display: flex;
  }
  &__gallery,
  &__description {
    flex: 1;
  }
  &__description {
    padding: 0 var(--spacer-sm);
    @include for-desktop {
      margin-left: calc(var(--spacer-base) * 3);
    }
  }

  &__advertisement {
    margin-top: var(--spacer-2xl, 3rem);
  }
}

.product-page-back {
  left: 0.5rem;
  position: absolute;
  top: 1.5rem;
  z-index: 4;
}

.sw-product-buy-box {
  @include for-desktop {
    display: flex;
  }
  &__gallery,
  &__description {
    flex: 1;
  }
  &__description {
    padding: 0 var(--spacer-sm);
    @include for-desktop {
      margin-left: calc(var(--spacer-base) * 3);
    }
  }
}
</style>
