<template>
  <article class="cms-block-text-on-image">
    <CmsGenericElement
      v-if="getContent"
      :content="getContent"
      class="cms-block-text-on-image__content"
    />
  </article>
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  name: "CmsBlockTextOnImage",

  components: {
    CmsGenericElement,
  },

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
@import "@/assets/scss/variables";
</style>
