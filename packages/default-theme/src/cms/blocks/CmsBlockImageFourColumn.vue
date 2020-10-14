<template>
  <article class="cms-block-image-four-column">
    <CmsGenericElement
      :content="getLeftContent"
      class="cms-block-image-four-column__image"
    />
    <CmsGenericElement
      :content="getCenterLeftContent"
      class="cms-block-image-four-column__image"
    />
    <CmsGenericElement
      :content="getCenterRightContent"
      class="cms-block-image-four-column__image"
    />
    <CmsGenericElement
      :content="getRightContent"
      class="cms-block-image-four-column__image"
    />
  </article>
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  name: "CmsBlockImageFourColumn",

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
      return this.getSlots.find(({ slot }) => slot === "left")
    },
    getCenterLeftContent() {
      return this.getSlots.find(({ slot }) => slot === "center-left")
    },
    getCenterRightContent() {
      return this.getSlots.find(({ slot }) => slot === "center-right")
    },
    getRightContent() {
      return this.getSlots.find(({ slot }) => slot === "right")
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

::v-deep.cms-block-image-four-column {
  display: grid;
  grid-gap: var(--spacer-sm);
  grid-template-rows: repeat(4, 340px);
  margin: var(--spacer-sm);

  &__image {
    img {
      height: 100%;
      object-fit: cover;
      object-position: center;
      width: 100%;
    }
  }

  @include for-desktop {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(1, 340px);
    margin: var(--spacer-sm) 0;
  }
}
</style>
