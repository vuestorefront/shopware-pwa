<template>
  <div class="sw-product-gallery gallery" ref="imageRef">
    <div v-if="mediaGallery.length > 0" class="gallery__mobile">
      <slot name="mobile-mobile" v-bind="mediaGallery">
        <SfGallery
          class="gallery-mobile"
          :images="mediaGallery"
          :current="1"
          thumb-width="160"
          thumb-height="160"
          image-width="400"
          image-height="600"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import { SfGallery } from "@storefront-ui/vue"
import { getProductMediaGallery } from "@shopware-pwa/helpers"
import getResizedImage from "@/helpers/images/getResizedImage.js"
import getPlaceholderImage from "@/helpers/images/getPlaceholderImage.js"

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
      const width =
        this.$refs.imageRef?.$el?.getBoundingClientRect()?.width || 400
      const height =
        this.$refs.imageRef?.$el?.getBoundingClientRect()?.height || 600
      return getProductMediaGallery({ product: this.product }).map(
        (element) => {
          return {
            desktop: {
              url: getResizedImage(element.desktop?.url, { width, height }),
            },
            mobile: {
              url: getResizedImage(element.mobile?.url, { width, height }),
            },
            icon: {
              url: getResizedImage(element.icon?.url, { width, height }),
            },
            zoom: {
              url: getResizedImage(element.desktop?.url, { width, height }),
              placeholder: getPlaceholderImage("100%", "100%"),
            },
            alt: element.alt || "gallery image",
            placeholder: getPlaceholderImage("100%", "100%"),
          }
        }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.gallery__mobile ::v-deep .glide__slide {
  min-width: 100px;
}

.gallery__mobile ::v-deep .sf-gallery__thumbs {
  width: 100%;
}
</style>
