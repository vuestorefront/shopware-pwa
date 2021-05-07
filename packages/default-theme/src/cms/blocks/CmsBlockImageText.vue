<template>
  <article class="cms-block-image-text">
    <CmsGenericElement
      :content="getLeftContent"
      class="cms-block-image-text__image"
    />
    <CmsGenericElement
      :content="getRightContent"
      class="cms-block-image-text__text"
    />
  </article>
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  name: "CmsBlockImageText",

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

.cms-block-image-text {
  display: flex;
  flex-direction: column;
  margin-right: 0;
  margin-left: 0;

  &__image,
  &__text {
    margin: var(--spacer-sm);
    flex: 1;
    --image-height: 340px;
    --image-width: 100%;
  }

  @include for-desktop {
    align-items: center;
    flex-direction: row;
    justify-content: space-around;

    .cms-block-image-text__image {
      margin-bottom: 0;
      margin-right: var(--spacer-sm);
      margin-top: 0;
    }

    .cms-block-image-text__text {
      margin-bottom: 0;
      margin-left: var(--spacer-sm);
      margin-top: 0;
    }
  }
}
</style>
