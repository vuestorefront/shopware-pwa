<template>
  <div class="sw-image">
    <SfImage :src="imgUrl" :title="title" :alt="alt" :lazy="lazyLoad" :class="{'sw-image--rounded': rounded}" :height="height" :width="height"/>
  </div>
</template>

<script>
 import {
   SfImage
 } from "@storefront-ui/vue";

export default {
  components: {
     SfImage
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    },
    rounded: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: undefined
    },
    height: {
      type: [String, Number],
      default: undefined
    }
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
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
.sw-image {
  position: relative;
  display: flex;
  justify-content: center;
  &--rounded {
    border-radius: 100%;
  }
}
</style>