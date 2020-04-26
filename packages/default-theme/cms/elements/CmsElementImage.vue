<template>
  <div class="cms-element-image"
      :style="getStyle">
    <a :href="getLink" v-if="getLink !== null">
      <img
        :src="imgUrl"
        :title="title"
        :alt="alt"
      />
    </a>
    <img
      :src="imgUrl"
      :title="title"
      :alt="alt"
      v-else
    />
  </div>
</template>

<script>
import { SfImage } from '@storefront-ui/vue'

export default {
  components: {
    SfImage,
  },
  name: 'CmsElementImage',
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
    getStyle() {
      return "height: " + this.content.translated.config.minHeight.value
    },
    getLink() {
      return this.content.translated.config.url && this.content.translated.config.url.value;
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../settings.scss';

.cms-element-image img {
  object-fit: cover !important;
  height: 100%;
  width: 100%;
}
</style>
