<template>
  <div class="cms-block-image-two-column" :style="getPadding">
    <CmsGenericElement
      :content="getLeftContent"
      class="cms-block-image-two-column__image"
    />
    <CmsGenericElement
      :content="getRightContent"
      class="cms-block-image-two-column__image"
    />
  </div>
</template>

<script>
import CmsGenericElement from 'sw-cms/CmsGenericElement'

export default {
  components: {
    CmsGenericElement,
  },
  name: 'CmsBlockImageTwoColumn',
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

.cms-block-image-two-column {
  overflow: hidden;
  display: flex;

  &__image {
  	flex: 0 0 50%;
    max-width: 50%;
  	padding-left: 20px;
  	padding-right: 20px;
  }
}

@media (max-width: 700px) {
  .cms-block-image-two-column {
    display: block;

    &__image {
      max-width: 100%;

      padding: 0; 
    }
  }
}
</style>
