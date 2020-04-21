<template>
  <div class="sw-sidebar-section">
    <div class="sw-sidebar-section__sidebar" v-if="getSidebarBlocks.length">
      <CmsGenericBlock
        v-for="cmsBlock in getSidebarBlocks"
        :key="cmsBlock.id"
        :content="cmsBlock"
      />
    </div>
    <div class="sw-sidebar-section__main">
      <CmsGenericBlock
        v-for="cmsBlock in getMainBlocks"
        :key="cmsBlock.id"
        :content="cmsBlock"
      />
    </div>
  </div>
</template>

<script>
import CmsGenericBlock from 'sw-cms/CmsGenericBlock'

export default {
  components: {
    CmsGenericBlock,
  },
  name: 'CmsSectionSidebar',
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
    getSidebarBlocks() {
      return this.getBlocks.filter(
        (block) => block.sectionPosition === 'sidebar'
      )
    },
    getMainBlocks() {
      return this.getBlocks.filter((block) => block.sectionPosition === 'main')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../settings.scss';

.sw-sidebar-section {
  display: flex;
  flex-direction: column;
  padding: 0 var(--spacer-big);

  @include desktop-size;

  @include for-desktop() {
    flex-direction: row;
  }

  &__sidebar {
    display: flex;
    flex-direction: column;
  }

  &__main {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
