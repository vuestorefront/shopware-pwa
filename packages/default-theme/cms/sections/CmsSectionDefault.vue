<template>
  <div class="sw-default-section" :class="{ 'sw-default-section--boxed': isSizingModeBoxed }">
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
    isSizingModeBoxed() {
      return this.content.sizingMode === 'boxed'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../settings.scss';

.sw-default-section {
  &--boxed {
    @include sizing-mode-boxed;
  }
}
</style>
