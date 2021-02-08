<template>
  <div
    class="sw-default-section"
    :style="sectionStyles"
    :class="{ 'sw-default-section--boxed': isSizingModeBoxed, ...cmsClass }"
  >
    <CmsGenericBlock
      v-for="cmsBlock in getBlocks"
      :key="cmsBlock.id"
      :content="cmsBlock"
    />
  </div>
</template>

<script>
import CmsGenericBlock from "sw-cms/CmsGenericBlock"

export default {
  components: {
    CmsGenericBlock,
  },
  name: "CmsSectionDefault",
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getBlocks() {
      return this.content.blocks || []
    },
    cmsClass() {
      return this.content?.cssClass
    },
    isSizingModeBoxed() {
      return this.content.sizingMode === "boxed"
    },
    sectionStyles() {
      const {
        backgroundColor,
        backgroundMedia,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      } = this.content
      return {
        backgroundColor,
        backgroundImage: backgroundMedia ? `url(${backgroundMedia.url})` : null,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/cms/settings.scss";

.sw-default-section {
  width: 100%;

  &--boxed {
    @include sizing-mode-boxed;
    & > div {
      @include sizing-mode-boxed;
    }
  }

  & > div {
    @include sizing-mode-boxed;
    max-width: none !important;
  }
}
</style>
