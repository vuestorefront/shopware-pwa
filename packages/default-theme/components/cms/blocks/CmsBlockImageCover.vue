<template>
  <div class="cms-block-image-cover">
    <CmsGenericComponent v-if="getContent" :content="getContent" />
  </div>
</template>

<script>
import CmsGenericComponent from '@shopware-pwa/default-theme/components/cms/CmsGenericComponent'

export default {
  components: {
    CmsGenericComponent,
  },
  name: 'CmsBlockImageCover',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getSlots() {
      return this.content.slots || []
    },
    getContent() {
      return this.getSlots.length && this.getSlots[0]
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@shopware-pwa/default-theme/components/cms/settings.scss';


</style>
