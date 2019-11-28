<template>
  <div>
    <CmsPage :content="cmsPage" />
  </div>
</template>
<script>
import CmsPage from "../CmsPage";

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
  },
  data() {
    return {
    }
  },
  computed: {
    cmsPageDescription () {
      return `"${this.cmsPage.name}" type: "${this.cmsPage.type}"`
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>