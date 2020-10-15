<template>
  <article class="cms-block-image-bubble-row">
    <CmsGenericElement
      :content="getLeftContent"
      class="cms-block-image-bubble-row__image"
    />
    <CmsGenericElement
      :content="getCenterContent"
      class="cms-block-image-bubble-row__image"
    />
    <CmsGenericElement
      :content="getRightContent"
      class="cms-block-image-bubble-row__image"
    />
  </article>
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  name: "CmsBlockImageBubbleRow",

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
@import "@/cms/settings.scss";

::v-deep.cms-block-image-bubble-row {
  display: grid;
  grid-gap: var(--spacer-sm);
  grid-template-rows: repeat(3, 286px);
  margin: var(--spacer-sm);

  &__image,
  .cms-element-image {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;

    img {
      border-radius: 50%;
      height: 250px;
      object-fit: cover;
      object-position: center;
      width: 250px;
    }
  }

  @include for-desktop {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 286px);
    margin: var(--spacer-sm) 0;
  }
}
</style>
