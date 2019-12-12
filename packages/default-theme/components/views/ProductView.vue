<template>
  <div v-if="product" id="product">
    <div class="product">
      <SwProductGallery :product="product" class="product__gallery" />
      <div class="product__description">
        <SfSticky class="product-details">
          <SwProductDetails :product="product" />
        </SfSticky>
      </div>
    </div>
  </div>
</template>
<script>
import { SfSticky } from '@storefront-ui/vue'
import { useProduct } from '@shopware-pwa/composables'
import SwProductGallery from '../cms/elements/SwProductGallery'
import SwProductDetails from '../cms/elements/SwProductDetails'

export default {
  name: 'Product',
  components: {
    SfSticky,
    SwProductGallery,
    SwProductDetails
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
      return (
        (this.productWithAssociations && this.productWithAssociations.value) ||
        this.page.product
      )
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
      'associations[children][associations][options][associations][group][]': true
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
</style>
