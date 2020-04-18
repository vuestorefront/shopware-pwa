<template>
  <div class="sw-default-section">
    <CmsGenericComponent
      v-for="cmsBlock in getBlocks"
      :key="cmsBlock.id"
      :content="cmsBlock"
    />
  </div>
</template>

<script>
import CmsGenericComponent from '@shopware-pwa/default-theme/components/cms/CmsGenericComponent'

export default {
  components: {
    CmsGenericComponent,
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
  },
}
</script>

<style lang="scss" scoped>
@import '@shopware-pwa/default-theme/components/cms/settings.scss';
</style>
