<template>
  <article class="cms-block-image-three-cover">
    <CmsGenericElement :content="getLeftContent" class="cms-block-image-three-cover__image"/>
    <CmsGenericElement :content="getCenterContent" class="cms-block-image-three-cover__image"/>
    <CmsGenericElement :content="getRightContent" class="cms-block-image-three-cover__image"/>
  </article>
</template>

<script>
import CmsGenericElement from 'sw-cms/CmsGenericElement'

export default {
  name: 'CmsBlockImageThreeCover',
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
@import '~@storefront-ui/vue/styles.scss';

.cms-block-image-three-cover {
  display: flex;
  flex-direction: column;

  &__image {
    flex: 1 1 0;
    & img {
      height: 340px;
      object-fit: cover;
    }
  }

  @include for-desktop {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
}

</style>
