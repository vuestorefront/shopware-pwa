<template>
  <div class="cms-page">
    <CmsGenericSection
      :content="cmsSection"
      v-for="cmsSection in cmsSections"
      :key="cmsSection.id"
    />
  </div>
</template>

<script>
import CmsGenericSection from 'sw-cms/CmsGenericSection'

export default {
  components: {
    CmsGenericSection,
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

<style lang="scss" scoped></style>
