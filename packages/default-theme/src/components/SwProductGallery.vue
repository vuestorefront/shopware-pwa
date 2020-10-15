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
import { SfGallery } from "@storefront-ui/vue"
import { getProductMediaGallery } from "@shopware-pwa/helpers"

export default {
  name: "SwProductGallery",
  components: { SfGallery },
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    mediaGallery() {
      return getProductMediaGallery({ product: this.product })
    },
  },
}
</script>

<style lang="scss" scoped>
.gallery__mobile .sf-gallery {
  align-items: center;
}

.gallery__mobile ::v-deep .glide__slide {
  min-width: 100px;
}

.gallery__mobile ::v-deep .sf-gallery__thumbs {
  width: 100%;
}
</style>
