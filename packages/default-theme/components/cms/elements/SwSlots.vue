<template>
  <div :class="slotClass">
    <div v-if="hasSidebar && sidebarSlot">
      <SwGenericBlock
        :content="sidebarSlot"
        :key="sidebarSlot.id"
        :style="slotStyles"
      />
    </div>
    <div class="elements">
      <SwGenericBlock
        :content="cmsSlot"
        v-for="cmsSlot in elementsSlots"
        :key="cmsSlot.id"
        :style="slotStyles"
      />
    </div>
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
    elementsSlots () {
      return this.hasSidebar ? this.cmsSlots.slice(1) : this.cmsSlots
    },
    sidebarSlot () {
      return this.cmsSlots && this.cmsSlots.length ? this.cmsSlots[0] : null
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
      return {
        "sw-blocks": this.isBlock,
        "sw-slots": !this.isBlock,
        "has-sidebar": this.hasSidebar
      }
    },
    hasSidebar () {
      return this.content && this.content.type === "sidebar"
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

.has-sidebar {
  display: flex;
}

.elements {
  display: flex;
  flex-direction: column;
}
</style>
