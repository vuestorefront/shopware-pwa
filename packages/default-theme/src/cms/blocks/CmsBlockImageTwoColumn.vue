<template>
  <article class="cms-block-image-two-column">
    <CmsGenericElement
      :content="getLeftContent"
      class="cms-block-image-two-column__image"
    />
    <CmsGenericElement
      :content="getRightContent"
      class="cms-block-image-two-column__image"
    />
  </article>
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  name: "CmsBlockImageTwoColumn",

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
    getRightContent() {
      return this.getSlots.find(({ slot }) => slot === "right")
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

::v-deep.cms-block-image-two-column {
  display: grid;
  grid-gap: var(--spacer-sm);
  grid-template-rows: repeat(2, 340px);
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
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 340px);
    margin: var(--spacer-sm) 0;
  }
}
</style>
