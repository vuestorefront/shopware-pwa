<template>
  <div class="sw-image-simple-grid">
    <CmsGenericElement :content="getLeftTopContent" class="sw-image-simple-grid__image"/>
    <getCenterContent :content="getLeftBottomContent" class="sw-image-simple-grid__image"/>
    <CmsGenericElement :content="getRightContent" class="sw-image-simple-grid__image sw-image-simple-grid__image--right"/>
  </div>
</template>

<script>
import CmsGenericElement from 'sw-cms/CmsGenericElement'

export default {
  name: 'CmsBlockImageSimpleGrid',
  components: {
    CmsGenericElement
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
    getLeftTopContent() {
      return this.getSlots.find(({slot}) => slot === 'left-top')
    },
    getLeftBottomContent() {
      return this.getSlots.find(({slot}) => slot === 'left-bottom')
    },
    getRightContent() {
      return this.getSlots.find(({slot}) => slot === 'right')
    },
  },
};
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';

.sw-image-simple-grid {
  display: grid;
  grid-gap: 1rem;
  align-items: stretch;

  @include for-desktop {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    &__image {
      margin: var(--spacer-medium);
      &--right {
        grid-column: 2;
        grid-row: 1 / 3;
      }  
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

</style>
