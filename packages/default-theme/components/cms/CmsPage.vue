<template>
  <div class="cms-page">
    <CmsGenericComponent
      :content="cmsSection"
      v-for="cmsSection in cmsSections"
      :key="cmsSection.id"
    />
  </div>
</template>

<script>
import CmsGenericComponent from '@shopware-pwa/default-theme/components/cms/CmsGenericComponent'
import { getCmsSections } from '@shopware-pwa/helpers'

export default {
  components: {
    CmsGenericComponent,
  },
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    cmsSections() {
      return this.content?.sections || []
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@shopware-pwa/default-theme/components/cms/settings.scss';
</style>
