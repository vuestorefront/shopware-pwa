<template>
  <div
    class="sw-sidebar-section"
    :class="{ 'sw-sidebar-section--boxed': isSizingModeBoxed }"
  >
    <div
      class="sw-sidebar-section__sidebar"
      :class="{ 'sw-sidebar-section__sidebar--boxed': isSizingModeBoxed }"
      v-if="getSidebarBlocks.length"
    >
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
import CmsGenericBlock from "sw-cms/CmsGenericBlock"

export default {
  components: {
    CmsGenericBlock,
  },
  name: "CmsSectionSidebar",
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
        (block) => block.sectionPosition === "sidebar"
      )
    },
    getMainBlocks() {
      return this.getBlocks.filter((block) => block.sectionPosition === "main")
    },
    isSizingModeBoxed() {
      return this.content.sizingMode === "boxed"
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/cms/settings.scss";

.sw-sidebar-section {
  display: flex;
  flex-direction: column;

  @include for-desktop() {
    flex-direction: row;
  }

  &--boxed {
    @include sizing-mode-boxed;
  }

  &__sidebar {
    display: flex;
    flex-direction: column;
    margin: 20px 0 0 0;
    @include for-desktop {
      margin-left: var(--spacer-base);
      border: 1px solid var(--c-light);
      border-width: 0 1px 0 0;
    }

    &--boxed {
      @include for-desktop {
        margin-left: inherit;
      }
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    width: 100%;

    & > div {
      @include for-desktop {
        max-width: inherit;
      }
    }
  }
}
</style>
