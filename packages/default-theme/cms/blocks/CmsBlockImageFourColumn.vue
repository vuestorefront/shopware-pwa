<template>
  <article class="cms-block-image-four-column">
    <CmsGenericElement :content="getLeftContent" class="cms-block-image-four-column__image"/>
    <CmsGenericElement :content="getCenterLeftContent" class="cms-block-image-four-column__image"/>
    <CmsGenericElement :content="getCenterRightContent" class="cms-block-image-four-column__image"/>
    <CmsGenericElement :content="getRightContent" class="cms-block-image-four-column__image"/>
  </article>
</template>

<script>
import CmsGenericElement from 'sw-cms/CmsGenericElement'

export default {
  name: 'CmsBlockImageFourColumn',
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
    getCenterLeftContent() {
      return this.getSlots.find(({slot}) => slot === 'center-left')
    },
    getCenterRightContent() {
      return this.getSlots.find(({slot}) => slot === 'center-right')
    },
    getRightContent() {
      return this.getSlots.find(({slot}) => slot === 'right')
    },
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.cms-block-image-four-column {
  display: flex;
  flex-direction: column;

  &__image {
    margin: var(--spacer-sm);
    flex: 1;
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
