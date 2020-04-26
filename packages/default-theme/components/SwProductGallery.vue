<template>
  <div class="sw-product-gallery gallery">
    <div v-if="mediaGallery.length > 0" class="gallery__mobile">
      <slot name="mobile-galery" v-bind="mediaGallery">
        <SfGallery class="gallery-mobile" :images="mediaGallery" />
      </slot>
    </div>
  </div>
</template>

<script>
import { SfImage, SfGallery } from '@storefront-ui/vue'
import { getProductMediaGallery } from '@shopware-pwa/helpers'

export default {
  name: 'SwProductGallery',
  components: { SfImage, SfGallery },
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    mediaGallery() {
      return getProductMediaGallery({ product: this.product })
    }
  }
}
</script>

<style lang="scss">
@import '~@storefront-ui/shared/styles/variables';

.gallery-mobile {
  $height-other: 240px;
  $height-iOS: 265px;

  height: calc(100vh - #{$height-other});
  @supports (-webkit-overflow-scrolling: touch) {
    height: calc(100vh - #{$height-iOS});
  }
  ::v-deep .glide {
    &,
    * {
      height: 100%;
    }
    &__slide {
      position: relative;
      overflow: hidden;
    }
    img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      min-width: calc((375 / 490) * (100vh - #{$height-other}));
      @supports (-webkit-overflow-scrolling: touch) {
        min-width: calc((375 / 490) * (100vh - #{$height-iOS}));
      }
    }
  }
  ::v-deep .sf-gallery__stage {
    width: 100%;
  }
}
</style>
