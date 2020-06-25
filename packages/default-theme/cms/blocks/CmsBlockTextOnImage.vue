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
  components: {
    CmsGenericElement,
  },
  name: "CmsBlockTextOnImage",
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
.cms-block-text-on-image {
  background-position: center;
  background-size: cover;

  &__content {
    padding: var(--spacer-2xl) var(--spacer-xl);
  }
}
</style>
