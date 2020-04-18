<template>
  <div class="cms-block-image-bubble-row">
    <CmsSlotImage
      v-for="slot in getSlots"
      :key="slot.id"
      :content="slot"
      class="cms-block-image-bubble-row__image"
    />
  </div>
</template>

<script>
import CmsSlotImage from '@shopware-pwa/default-theme/components/cms/slots/CmsSlotImage'

export default {
  components: {
    CmsSlotImage,
  },
  name: 'CmsBlockImageBubbleRow',
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

.cms-block-image-bubble-row {
  display: flex;
  flex-direction: column;
  margin: var(--spacer-extra-big) 0;
  height: 100%;

  &__image {
    display: inline-block;
    position: relative;
    width: auto;
    height: 100vw;
    overflow: hidden;
    border-radius: 50%;
    --image-height: 100%;
    margin: var(--spacer-small) 0;

    @include for-desktop {
      max-height: 250px;
      max-width: 250px;
      --image-width: auto;
    }
  }

  @include for-desktop {
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
