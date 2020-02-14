<template>
  <div>
    <CmsPage :content="cmsPage" />
  </div>
</template>
<script>
import CmsPage from "@shopware-pwa/default-theme/components/CmsPage";

export default {
  name: 'CategoryView',
  components: {
    CmsPage
  },
  props: {
    cmsPage: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
