<template>
  <article class="cms-block-text-on-image">
    <CmsGenericElement
      :content="getLeftContent"
      class="cms-block-text-on-image__image"
    />
    <CmsGenericElement
      :content="getRightContent"
      class="cms-block-text-on-image__text"
    />
  </article>
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  name: "CmsBlockTextOnImage",

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

.cms-block-text-on-image {
  display: flex;
  flex-direction: column;
  margin-right: 0;
  margin-left: 0;

  &__image,
  &__text {
    margin: var(--spacer-sm);
    flex: 1;
    & img {
      height: 340px;
      object-fit: cover;
      width: 100%;
    }
  }

  @include for-desktop {
    align-items: center;
    flex-direction: row;
    justify-content: space-around;

    .cms-block-text-on-image__image {
      margin-bottom: 0;
      margin-right: var(--spacer-sm);
      margin-top: 0;
    }

    .cms-block-text-on-image__text {
      margin-bottom: 0;
      margin-left: var(--spacer-sm);
      margin-top: 0;
    }
  }
}
</style>
