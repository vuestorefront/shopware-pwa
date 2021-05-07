<template>
  <SwLink
    v-if="link"
    :link="link"
    :target="target"
    class="cms-element-image__link"
  >
    <SfImage
      :src="imgUrl"
      :title="title"
      :alt="alt"
      :loading="lazyLoad"
      class="cms-element-image"
    />
  </SwLink>
  <SfImage
    v-else
    :src="imgUrl"
    :title="title"
    :alt="alt"
    :loading="lazyLoad"
    class="cms-element-image"
  />
</template>

<script>
import { getCmsLink, getCmsLinkTarget } from "@shopware-pwa/helpers"
import { SfImage } from "@storefront-ui/vue"
import SwLink from "@/components/atoms/SwLink.vue"

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
    alt() {
      return (this.getMedia && this.getMedia.alt) || " "
    },

    getMedia() {
      return this.content && this.content.data && this.content.data.media
    },

    imgUrl() {
      const url = this.getMedia && this.getMedia.url
      return url || ""
    },

    lazyLoad() {
      return "lazy"
    },

    link() {
      return getCmsLink(this.content)
    },

    title() {
      return this.getMedia && this.getMedia.title
    },

    target() {
      return getCmsLinkTarget(this.content)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/cms/settings.scss";

.cms-element-image {
  --image-width: 100%;
}
</style>
