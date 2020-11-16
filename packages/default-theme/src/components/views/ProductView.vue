<template>
  <div v-if="product" id="product">
    <SwPluginSlot name="product-page-details-before" :slot-context="product" />
    <SwGoBackArrow class="product-page-back" />
    <div class="product">
      <SwProductGallery :product="product" class="product__gallery" />
      <div class="product__description">
        <SwProductDetails :product="product" :page="page" />
      </div>
    </div>
    <SwPluginSlot name="product-page-details-after" :slot-context="product" />

    <div v-if="crossSellCollection.length" class="products__recomendations">
      <div class="products-recomendations__section">
        <SfTabs :open-tab="1">
          <SfTab
            v-for="crossSell in crossSellCollection"
            :key="crossSell.id"
            :title="crossSell.translated.name"
          >
            <SwProductCarousel :products="crossSell.assignedProducts" />
          </SfTab>
        </SfTabs>
      </div>
    </div>

    <SfSection
      title-heading="Share Your Look"
      subtitle-heading="#YOURLOOK"
      class="section"
    >
      <div class="images-grid">
        <div class="images-grid__row">
          <div class="images-grid__col">
            <SfImage src="/img/imageA.png">katherina_trn</SfImage>
          </div>
          <div class="images-grid__col">
            <SfImage src="/img/imageB.png">katherina_trn</SfImage>
          </div>
          <div class="images-grid__col">
            <SfImage src="/img/imageC.png">katherina_trn</SfImage>
          </div>
        </div>
        <div class="images-grid__row">
          <div class="images-grid__col">
            <SfImage src="/img/imageC.png">katherina_trn</SfImage>
          </div>
          <div class="images-grid__col">
            <SfImage src="/img/imageD.png">katherina_trn</SfImage>
          </div>
          <div class="images-grid__col">
            <SfImage src="/img/imageA.png">katherina_trn</SfImage>
          </div>
        </div>
      </div>
    </SfSection>
    <div class="product__advertisement">
      <SwProductAdvertisement />
    </div>
  </div>
</template>
<script>
import { SfImage, SfSection, SfTabs } from "@storefront-ui/vue"
import { useProduct } from "@shopware-pwa/composables"
import SwGoBackArrow from "@/components/atoms/SwGoBackArrow"
import SwProductGallery from "@/components/SwProductGallery"
import SwProductDetails from "@/components/SwProductDetails"
import SwProductCarousel from "@/components/SwProductCarousel"
import SwProductAdvertisement from "@/components/SwProductAdvertisement"
import SwPluginSlot from "sw-plugins/SwPluginSlot"

export default {
  name: "Product",
  components: {
    SwGoBackArrow,
    SfImage,
    SfSection,
    SfTabs,
    SwProductGallery,
    SwProductDetails,
    SwProductCarousel,
    SwProductAdvertisement,
    SwPluginSlot,
  },
  props: {
    page: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      productWithAssociations: null,
      selectedSize: null,
      selectedColor: null,
    }
  },
  computed: {
    product() {
      return this.productWithAssociations
        ? this.productWithAssociations.value
        : this.page.product
    },
    crossSellCollection() {
      return this.product.crossSellings || []
    },
  },
  // load children association from the parent - variants and cross sells loading
  async mounted() {
    try {
      const { loadAssociations, product } = useProduct(this, this.page.product)
      await loadAssociations()
      this.productWithAssociations = product
    } catch (e) {
      console.error("ProductView:mounted:loadAssociations", e)
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

.products__recomendations {
  @include for-desktop {
    margin-top: var(--spacer-xl);
  }

  ::v-deep .sf-tabs__content {
    max-width: 100%;
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
}
.product-page-back {
  left: 0.5rem;
  position: absolute;
  top: 1.5rem;
  z-index: 4;
}
</style>
