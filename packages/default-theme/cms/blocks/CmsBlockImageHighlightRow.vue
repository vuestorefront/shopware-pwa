<template>
  <article class="cms-block-image-highlight-row">
    <CmsGenericElement :content="getLeftContent" class="cms-block-image-highlight-row__image"/>
    <CmsGenericElement :content="getCenterContent" class="cms-block-image-highlight-row__image"/>
    <CmsGenericElement :content="getRightContent" class="cms-block-image-highlight-row__image"/>
  </article>
</template>

<script>
import CmsGenericElement from 'sw-cms/CmsGenericElement'

export default {
  name: 'CmsBlockImageHighlightRow',
  components: {
    CmsGenericElement,
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
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
};
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.cms-block-image-highlight-row {
  display: flex;
  flex-direction: column;

  &__image {
    margin: var(--spacer-sm);
    flex: 1;
    border: 12px solid #fff;
    & img {
      height: 340px;
      object-fit: cover;
      width: 100%;
    }
  }

  @include for-desktop {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
}

</style>
