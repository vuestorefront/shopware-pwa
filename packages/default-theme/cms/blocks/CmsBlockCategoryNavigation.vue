<template>
  <CmsGenericElement
    v-if="getContent"
    :content="getContent"
    class="cms-block-category-navigation"
  />
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  components: {
    CmsGenericElement,
  },
  name: "CmsBlockCategoryNavigation",
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

<style lang="scss" scoped></style>
