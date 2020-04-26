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
  display: flex;

  &__image {
  	flex: 0 0 33.3333333333%;
    max-width: 33.3333333333%;
  	padding-left: 20px;
  	padding-right: 20px;
  }
}

@media (max-width: 700px) {
  .cms-block-image-three-column {
    display: block;

    &__image {
      max-width: 100%;
      padding: 0; 
    }
  }
}
</style>
