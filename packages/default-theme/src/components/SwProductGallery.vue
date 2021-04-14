<template>
  <div class="sw-product-gallery gallery" ref="imageRef">
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
import { getResizedImage } from "@/helpers/images"

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
          }
        }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.sw-product-gallery {
  width: 100%;
  min-height: 300px;
  max-height: 600px;
}

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
