<template>
  <CmsGenericElement
    v-if="getContent"
    :content="getContent"
    class="cms-block-default"
  />
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  components: {
    CmsGenericElement,
  },
  name: "CmsBlockDefault",
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
@import "../settings.scss";

.cms-block-default {
  @include sizing-mode-boxed;
}
</style>
