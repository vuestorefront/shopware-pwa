<template>
  <div v-if="product" id="product">
    <div class="product">
      <SwProductGallery :product="product" class="product__gallery" />
      <div class="product__description">
        <SfSticky class="product-details">
          <SwProductDetails :product="product" :page="page" />
        </SfSticky>
      </div>
    </div>
    <div class="products" />
    <div class="products__recomendations">
      <div class="products-recomendations__section">
        <SwProductCarousel />
      </div>
      <div class="products-recomendations__section">
        <SwProductCarousel title-heading="You might also like" />
      </div>
    </div>
    <div class="">
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
    </div>
    <div class="product__advertisement">
      <SwProductAdvertisement />
    </div>
  </div>
</template>
<script>
import { SfSticky, SfImage, SfSection } from '@storefront-ui/vue'
import { useProduct } from '@shopware-pwa/composables'
import SwProductGallery from '../SwProductGallery'
import SwProductDetails from '../SwProductDetails'
import SwProductCarousel from '../SwProductCarousel'
import SwProductAdvertisement from '../SwProductAdvertisement'

export default {
  name: 'Product',
  components: {
    SfSticky,
    SfImage,
    SfSection,
    SwProductGallery,
    SwProductDetails,
    SwProductCarousel,
    SwProductAdvertisement
  },
  props: {
    page: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      productWithAssociations: null,
      relatedProducts: [],
      selectedSize: null,
      selectedColor: null
    }
  },
  computed: {
    product() {
      return this.productWithAssociations ? this.productWithAssociations.value : this.page.product
    }
  },
  async mounted() {
    // TODO remove when page resolver is fully done
    const associations = {
      'associations[media][]': true,
      'associations[options][associations][group][]': true,
      'associations[properties][associations][group][]': true,
      'associations[productReviews][]': true, // can be fetched asynchronously
      'associations[manufacturer][]': true,
      'associations[children][associations][options][associations][group][]': true,
      "associations[children][associations][seoUrls][]": true,
    }

    const { loadAssociations, product } = useProduct(this.page.product)
    this.productWithAssociations = product
    loadAssociations(associations)
    
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/shared/styles/variables';
@import '~@storefront-ui/shared/styles/helpers/visibility';
@import '~@storefront-ui/vue/src/utilities/transitions/transitions.scss';

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
@mixin for-iOS {
  @supports (-webkit-overflow-scrolling: touch) {
    @content;
  }
}

#product {
  box-sizing: border-box;
  margin: 0 0 60px 0;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
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
    padding: 0 $spacer-big;
    @include for-desktop {
      margin-left: $spacer-big * 5;
    }
  }
}

.images-grid {
  &__row {
    display: flex;
    & + & {
      margin-top: $spacer-big / 2;
      @include for-desktop {
        margin-top: $spacer-big;
      }
    }
  }
  &__col {
    margin: 0;
    & + & {
      margin-left: $spacer-big / 2;
      @include for-desktop {
        margin-left: $spacer-big;
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
    padding: 0 $spacer-big;
    @include for-desktop {
      margin-left: $spacer-big * 5;
    }
  }
}
</style>
