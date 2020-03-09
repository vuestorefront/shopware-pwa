<template>
  <div class="cms-page">
    <SwSlots
      :content="cmsSection"
      v-for="cmsSection in cmsSections"
      :key="cmsSection.id"
    />
  </div>
</template>

<script>
import SwSlots from '@shopware-pwa/default-theme/components/cms/elements/SwSlots'
import { getCmsSections } from '@shopware-pwa/helpers'

export default {
  components: {
    SwSlots
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    cmsSections() {
      return getCmsSections(this.content)
    }
  }
}
</script>

<style lang="scss" scoped></style>
