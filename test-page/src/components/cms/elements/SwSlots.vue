<template>
  <div class="sw-slots">
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
    cmsSlots() {
      return this.content && this.content.slots ? this.content.slots : [];
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
    }
  }
};
</script>

<style lang="scss" scoped>
.sw-slots {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
