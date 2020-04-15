<template>
  <component
    :is="getComponent"
    :content="content"
    :style="slotStyles"
    :class="getClass"
  />
</template>

<script>
import { getComponentBy } from '../cmsNameMapper'

export default {
  props: {
    content: {
      type: Object,
      default: () => ({}),
    }
  },
  computed: {
    getComponent() {
      return getComponentBy(this.content)
    },
    getClass() {
      return this.$attrs.class || {}
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
