<template>
  <div v-if="imgUrl">
    <SwLink
      v-if="link"
      :link="link"
      :target="target"
      class="cms-element-image__link"
    >
      <SwImage
        :src="imgUrl"
        :title="title"
        :alt="alt"
        :loading="lazyLoad"
        class="cms-element-image"
      />
    </SwLink>
    <SwImage
      v-else
      :src="imgUrl"
      :title="title"
      :alt="alt"
      :loading="lazyLoad"
      class="cms-element-image"
    />
  </div>
</template>

<script>
import { getCmsLink, getCmsLinkTarget } from "@shopware-pwa/helpers"
import SwLink from "@/components/atoms/SwLink.vue"
import SwImage from "@/components/atoms/SwImage.vue"
import getResizedImage from "@/helpers/images/getResizedImage.js"

export default {
  name: "CmsElementImage",

  components: {
    SwImage,
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
      return getResizedImage(this.getMedia && this.getMedia.url)
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
  width: 100%;
}
</style>
