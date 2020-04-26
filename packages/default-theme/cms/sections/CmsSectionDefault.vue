<template>
  <div class="sw-default-section" :style="getBackgroundColor">
    <CmsGenericBlock
      v-for="cmsBlock in getBlocks"
      :key="cmsBlock.id"
      :content="cmsBlock"
    />
  </div>
</template>

<script>
import CmsGenericBlock from 'sw-cms/CmsGenericBlock'

export default {
  components: {
    CmsGenericBlock,
  },
  name: 'CmsSectionDefault',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getBlocks() {
      return this.content.blocks || []
    },
    getBackgroundColor() {
      return "background-color:" + this.content.backgroundColor;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../settings.scss';
</style>
