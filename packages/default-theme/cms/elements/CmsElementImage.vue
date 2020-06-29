<template>
  <SwLink v-if="link" :link="link" :target="target">
    <SfImage
      :src="imgUrl"
      :title="title"
      :alt="alt"
      :lazy="lazyLoad"
      class="cms-element-image"
    />
  </SwLink>
  <SfImage
    v-else
    :src="imgUrl"
    :title="title"
    :alt="alt"
    :lazy="lazyLoad"
    class="cms-element-image"
  />
</template>

<script>
import { SfImage } from "@storefront-ui/vue"
import SwLink from "@shopware-pwa/default-theme/components/atoms/SwLink"

export default {
  name: "CmsElementImage",

  components: {
    SfImage,
    SwLink,
  },

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

    link() {
      return this.content?.data?.url || ""
    },

    target() {
      const inNewTab = this.content?.data?.newTab
      return inNewTab ? "_blank" : "_self"
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../settings.scss";

.cms-element-image {
  --image-width: 100%;
  width: 100%;
}
</style>
