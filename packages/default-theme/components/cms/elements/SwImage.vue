<template>
  <div class="sw-image">
    <SfImage :src="imgUrl" :title="title" :alt="alt" :lazy="lazyLoad" />
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
}
</style>