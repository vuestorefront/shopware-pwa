<template>
  <div :class="slotClass">
    <SwGenericBlock
      :content="cmsSlot"
      v-for="cmsSlot in cmsSlots"
      :key="cmsSlot.id"
      :style="slotStyles"
    />
  </div>
</template>

<script>
import SwGenericBlock from "./SwGenericBlock";

export default {
  components: {
    SwGenericBlock
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isBlock() {
      return this.content.blocks && this.content.blocks.length;
    },
    cmsSlots() {
      const key = this.isBlock ? "blocks" : "slots";
      return this.content && this.content[key] ? this.content[key] : [];
    },
    backgroundMediaId() {
      return this.content.backgroundMediaId;
    },
    backgroundMedia() {
      return this.content.backgroundMedia;
    },
    backgroundMediaMode() {
      return this.content.backgroundMediaMode;
    },
    slotStyles() {
      const {
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        backgroundColor
      } = this.content;
      return {
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        backgroundColor
      };
    },
    slotClass() {
      return this.isBlock ? "sw-blocks" : "sw-slots";
    }
  }
};
</script>

<style lang="scss" scoped>
.sw-blocks {
}

.sw-slots {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
