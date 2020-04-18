<template>
  <SfImage
    :src="imgUrl"
    :title="title"
    :alt="alt"
    :lazy="lazyLoad"
    class="cms-slot-image"
  />
</template>

<script>
import { SfImage } from '@storefront-ui/vue'

export default {
  components: {
    SfImage,
  },
  name: 'CmsSlotImage',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getMedia() {
      return this.content && this.content.data && this.content.data.media
    },
    imgUrl() {
      return this.getMedia && this.getMedia.url
    },
    alt() {
      return this.getMedia && this.getMedia.alt
    },
    title() {
      return this.getMedia && this.getMedia.title
    },
    lazyLoad() {
      return true
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@shopware-pwa/default-theme/components/cms/settings.scss';

.cms-slot-image {
  --image-width: 100%;
  width: 100%;
}
</style>
