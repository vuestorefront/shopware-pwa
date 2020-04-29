<template>
  <article class="cms-block-image-cover">
    <CmsGenericElement v-if="getContent" :content="getContent" />
  </article>
</template>

<script>
import CmsGenericElement from 'sw-cms/CmsGenericElement'

export default {
  components: {
    CmsGenericElement,
  },
  name: 'CmsBlockImageCover',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getSlots() {
      return this.content.slots || []
    },
    getContent() {
      return this.getSlots.length && this.getSlots[0]
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
