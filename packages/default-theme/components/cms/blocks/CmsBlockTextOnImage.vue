<template>
  <div class="cms-block-text-on-image">
    <CmsSlotText
      v-if="getContent"
      :content="getContent"
      class="cms-block-text-on-image__content"
    />
  </div>
</template>

<script>
import CmsSlotText from '@shopware-pwa/default-theme/components/cms/slots/CmsSlotText'

export default {
  components: {
    CmsSlotText,
  },
  name: 'CmsBlockTextOnImage',
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

.cms-block-text-on-image {
  &__content {
    padding: var(--spacer-extra-big);
  }
}
</style>
