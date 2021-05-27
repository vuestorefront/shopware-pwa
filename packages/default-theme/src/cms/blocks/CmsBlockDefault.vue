<template>
  <div>
    <CmsGenericElement
      v-for="slot in getSlots"
      :key="slot.id"
      :content="slot"
      class="cms-block-default"
    />
  </div>
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  name: "CmsBlockDefault",

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
  },
}
</script>

<style lang="scss" scoped>
@import "@/cms/settings.scss";

.cms-block-default {
  @include sizing-mode-boxed;
}
</style>
