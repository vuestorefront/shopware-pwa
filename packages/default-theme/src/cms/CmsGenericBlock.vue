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
    slotStyles() {
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

<style lang="scss" scoped></style>
