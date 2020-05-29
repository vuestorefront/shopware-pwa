<template>
  <article class="cms-block-image-three-column">
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
  </article>
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  components: {
    CmsGenericElement,
  },
  name: "CmsBlockImageThreeColumn",
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
    getCenterContent() {
      return this.getSlots.find(({ slot }) => slot === "center")
    },
    getRightContent() {
      return this.getSlots.find(({ slot }) => slot === "right")
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.cms-block-image-three-column {
  display: flex;
  flex-direction: column;

  &__image {
    margin: var(--spacer-sm);
    flex: 1;
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
