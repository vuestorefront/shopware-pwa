<template>
  <div class="cms-block-split-view">
    <CmsGenericElement
      :content="getLeftContent"
      class="cms-block-split-view__element"
    />
    <CmsGenericElement
      :content="getRightContent"
      class="cms-block-split-view__element right-view"
    />
  </div>
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  name: "CmsBlockSplitView",

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
    getLeftContent() {
      return this.getSlots.find(({ slot }) => slot === "left")
    },
    getRightContent() {
      return this.getSlots.find(({ slot }) => slot === "right")
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/cms/settings.scss";

.cms-block-split-view {
  @include for-desktop {
    display: flex;
  }
  &__element {
    flex: 1;
  }
}
.right-view {
  @include for-desktop {
    margin-left: calc(var(--spacer-base) * 3);
  }
}
</style>
