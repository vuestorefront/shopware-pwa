<template>
  <div class="sw-product-gallery gallery">
    <template v-if="mediaGallery.length > 0">
      <slot name="desktop-galery" v-bind="mediaGallery">
        <div
          v-for="(picture, id) in mediaGallery"
          :key="id"
          class="gallery__desktop"
        >
          <SfImage
            v-if="picture.mobile"
            :src="picture.mobile.url"
            class="image__big desktop-only"
          />
          <SfImage
            v-else-if="picture.desktop"
            :src="picture.desktop.url"
            class="image__medium dektop-only"
          />
        </div>
      </slot>
    </template>
    <div v-if="mediaGallery.length > 0" class="gallery__mobile mobile-only">
      <slot name="mobile-galery" v-bind="mediaGallery">
        <SfGallery class="gallery-mobile mobile-only" :images="mediaGallery" />
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

.sf-gallery {
  $this: &;
  ::v-deep {
    ul {
      margin: 0;
    }
    #{$this}__thumbs {
      left: 50%;
      transform: translateX(-50%);
      top: auto;
      bottom: 10px;
      display: flex;
    }
    #{$this}__item {
      &:not(:first-child) {
        margin: 0 0 0 var(--spacer);
      }
    }
  }
}
</style>
