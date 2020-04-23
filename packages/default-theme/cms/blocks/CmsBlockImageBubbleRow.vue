<template>
  <div class="cms-block-image-bubble-row">
    <CmsGenericElement
      :content="getLeftContent"
      class="cms-block-image-bubble-row__image"
    />
    <CmsGenericElement
      :content="getCenterContent"
      class="cms-block-image-bubble-row__image"
    />
    <CmsGenericElement
      :content="getRightContent"
      class="cms-block-image-bubble-row__image"
    />
  </div>
</template>

<script>
import CmsGenericElement from 'sw-cms/CmsGenericElement'

export default {
  components: {
    CmsGenericElement,
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
    getLeftContent() {
      return this.getSlots.find((element) => element.slot === 'left')
    },
    getCenterContent() {
      return this.getSlots.find((element) => element.slot === 'center')
    },
    getRightContent() {
      return this.getSlots.find((element) => element.slot === 'right')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../settings.scss';

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
