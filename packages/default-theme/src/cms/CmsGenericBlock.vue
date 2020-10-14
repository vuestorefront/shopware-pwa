<template>
  <component
    :is="getComponent"
    :content="content"
    :style="slotStyles"
    :class="cmsClass"
  />
</template>

<script>
import { getCmsBlockComponent } from "sw-cms/cmsNameMapper"

export default {
  name: "CmsGenericBlock",

  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    getComponent() {
      return getCmsBlockComponent(this.content)
    },
    cmsClass() {
      return this.content?.cssClass
    },
    backgroundMediaMode() {
      return this.content.backgroundMediaMode
    },
    slotStyles() {
      const { backgroundMedia } = this.content
      return {
        backgroundImage: backgroundMedia ? `url(${backgroundMedia.url})` : null,
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
