<template>
  <article class="cms-block-image-bubble-row">
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
  </article>
</template>

<script>
import CmsGenericElement from 'sw-cms/CmsGenericElement'

export default {
  name: 'CmsBlockImageBubbleRow',
  components: {
    CmsGenericElement,
  },
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
      return this.getSlots.find(({slot}) => slot === 'left')
    },
    getCenterContent() {
      return this.getSlots.find(({slot}) => slot === 'center')
    },
    getRightContent() {
      return this.getSlots.find(({slot}) => slot === 'right')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../settings.scss';

.cms-block-image-bubble-row {
  display: flex;
  flex-direction: column;
  padding: 0 var(--spacer-sm);
  margin: var(--spacer-xl) 0;
  height: 100%;

  &__image {
    display: inline-block;
    position: relative;
    width: auto;
    height: 100vw;
    overflow: hidden;
    border-radius: 50%;
    --image-height: 100%;
    margin: var(--spacer-2xs) 0;

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
