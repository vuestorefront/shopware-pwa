<template>
  <div class="sw-slots">
    <SwGenericBlock
      :content="cmsSlot"
      v-for="cmsSlot in cmsSlots"
      :key="cmsSlot.id"
      v-bind:style="{ 
          marginTop: marginTop,
          marginBottom: marginBottom,
          marginLeft: marginLeft,
          marginRight: marginRight,
          backgroundColor: backgroundColor
       }"
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
      default: () => ({
        content: {
          slots: [],
          sectionId: null,
          section: null,
          position: null,
          name: null,
          sectionPosition: null,
          marginTop: null,
          marginBottom: null,
          marginLeft: null,
          marginRight: null,
          backgroundColor: null,
          backgroundMediaId: null,
          backgroundMedia: null,
          backgroundMediaMode: null,
        }
      })
    }
  },
  computed: {
    cmsSlots() {
      return this.content && this.content.slots ? this.content.slots : [];
    },
    marginTop() {
      return this.content.marginTop 
    },
    marginBottom() {
      return this.content.marginBottom
    },
    marginLeft() {
      return this.content.marginLeft
    },
    marginRight() {
      return this.content.marginRight
    },
    backgroundColor() {
      return this.content.backgroundColor
    },
    backgroundMediaId() {
      return this.content.backgroundMediaId
    },
    backgroundMedia() {
      return this.content.backgroundMedia
    },
    backgroundMediaMode() {
      return this.content.backgroundMediaMode
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
