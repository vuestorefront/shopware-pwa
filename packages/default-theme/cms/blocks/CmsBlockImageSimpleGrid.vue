<template>
  <article class="sw-image-simple-grid">
    <section class="sw-image-simple-grid__left-images">
      <CmsGenericElement
        :content="getLeftTopContent"
        class="sw-image-simple-grid__image"
      />
      <CmsGenericElement
        :content="getLeftBottomContent"
        class="sw-image-simple-grid__image"
      />
    </section>
    <CmsGenericElement
      :content="getRightContent"
      class="sw-image-simple-grid__image sw-image-simple-grid__image--right"
    />
  </article>
</template>

<script>
import CmsGenericElement from 'sw-cms/CmsGenericElement'

export default {
  name: 'CmsBlockImageSimpleGrid',
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
    getLeftTopContent() {
      return this.getSlots.find(({ slot }) => slot === 'left-top')
    },
    getLeftBottomContent() {
      return this.getSlots.find(({ slot }) => slot === 'left-bottom')
    },
    getRightContent() {
      return this.getSlots.find(({ slot }) => slot === 'right')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

::v-deep.sw-image-simple-grid {
  display: flex;
  flex-direction: column;
  &__image {
    img {
      height: 340px;
      object-fit: cover;
    }
  }
  @include for-desktop {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    &__left-images {
      display: flex;
      flex-direction: column;
      margin: var(--spacer-sm);
    }
    &__image {
      margin: var(--spacer-sm);
      &--right {
        img {
          height: 712px;
        }
      }
    }
  }
}
</style>
