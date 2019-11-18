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
    imgUrl() {
      return this.content.data.media.url || ""
    },
    alt() {
      return this.content.data.media.alt || ""
    },
    title() {
      return this.content.data.media.title || ""
    },
    lazyLoad() {
      return true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
