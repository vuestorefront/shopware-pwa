<template>
  <div class="sw-slots">
    <SwGenericBlock
      :content="cmsSlot"
      v-for="cmsSlot in cmsSlots"
      :key="cmsSlot.id"
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
