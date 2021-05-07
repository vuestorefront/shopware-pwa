<template>
  <article class="cms-block-center-text">
    <CmsGenericElement
      :content="getLeftContent"
      class="cms-block-center-text__image"
    />
    <CmsGenericElement
      :content="getCenterContent"
      class="cms-block-center-text__text"
    />
    <CmsGenericElement
      :content="getRightContent"
      class="cms-block-center-text__image"
    />
  </article>
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  name: "CmsBlockCenterText",
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
@import "@/assets/scss/variables";

.cms-block-center-text {
  display: flex;
  flex-direction: column;

  &__image,
  &__text {
    margin: var(--spacer-sm);
    flex: 1;
    --image-height: 340px;
    --image-width: 100%;
  }

  @include for-desktop {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
