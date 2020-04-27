<template>
  <div class="cms-block-image-three-column" :style="getPadding">
    <CmsGenericElement
      :content="getLeftContent"
      class="cms-block-image-three-column__image"
    />
    <CmsGenericElement
      :content="getCenterContent"
      class="cms-block-image-three-column__image"
    />
    <CmsGenericElement
      :content="getRightContent"
      class="cms-block-image-three-column__image"
    />
  </div>
</template>

<script>
import CmsGenericElement from 'sw-cms/CmsGenericElement'

export default {
  components: {
    CmsGenericElement,
  },
  name: 'CmsBlockImageThreeColumn',
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
    getPadding() {
      return "padding: " + this.content.marginTop + " "
       + this.content.marginRight + " "
       + this.content.marginBottom + " "
       + this.content.marginBottom;
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../settings.scss';

.cms-block-image-three-column {
  overflow: hidden;
  display: block;
  margin: 0 -20px;

  &__image {
    box-sizing: border-box;
    max-width: 100%;
    padding: 10px 0;

    &:first-child {
      margin-top: -10px;
      padding-top: 0;
    }

    &:last-child {
      margin-bottom: -10px;
      padding-bottom: 0;
    }
  }
}

@media screen and (min-width: 768px) {
  .cms-block-image-three-column {
    display: flex;

    &__image {
      flex: 0 0 33.3333333333%;
      max-width: 33.3333333333%;
      padding: 0 20px;

      &:first-child,
      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
