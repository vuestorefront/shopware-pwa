<template>
  <div class="sw-section">
    <SwGenericBlock
      :content="cmsBlock"
      v-for="cmsBlock in cmsBlocks"
      :key="cmsBlock.id"
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
    cmsBlocks() {
      return this.content && this.content.blocks ? this.content.blocks : [];
    }
  }
};
</script>

<style lang="scss" scoped></style>
