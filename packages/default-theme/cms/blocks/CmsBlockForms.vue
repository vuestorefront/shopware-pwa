<template>
  <CmsGenericElement
    v-if="getContent"
    :content="getContent"
    :style="{
      'background-color': getBackgroundColor,
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
    }"
    class="cms-block-forms"
  />
</template>
<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"
export default {
  name: "CmsBlockForms",
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
    getBackgroundColor() {
      return this.content.backgroundColor
    },
  },
}
</script>
<style lang="scss" scoped>
@import "@/cms/settings.scss";
.cms-block-forms {
  @include sizing-mode-boxed;
}
</style>
