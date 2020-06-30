<template>
  <article class="sw-image-simple-grid">
    <CmsGenericElement
      :content="getLeftTopContent"
      class="sw-image-simple-grid__image sw-image-simple-grid__image--left-top"
    />
    <CmsGenericElement
      :content="getLeftBottomContent"
      class="sw-image-simple-grid__image sw-image-simple-grid__image--left-bottom"
    />
    <CmsGenericElement
      :content="getRightContent"
      class="sw-image-simple-grid__image sw-image-simple-grid__image--right-full"
    />
  </article>
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  name: "CmsBlockImageSimpleGrid",

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
    getLeftTopContent() {
      return this.getSlots.find(({ slot }) => slot === "left-top")
    },
    getLeftBottomContent() {
      return this.getSlots.find(({ slot }) => slot === "left-bottom")
    },
    getRightContent() {
      return this.getSlots.find(({ slot }) => slot === "right")
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

::v-deep.sw-image-simple-grid {
  display: grid;
  grid-gap: var(--spacer-sm);
  grid-template-areas:
    "left-top"
    "left-bottom"
    "right-full";
  grid-template-rows: repeat(3, 340px);
  margin: var(--spacer-sm);

  &__image {
    &--left-top {
      grid-area: left-top;
    }

    &--left-bottom {
      grid-area: left-bottom;
    }

    &--right-full {
      grid-area: right-full;
    }

    img {
      height: 100%;
      object-fit: cover;
      object-position: center;
      width: 100%;
    }
  }

  @include for-desktop {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 340px);
    grid-template-areas:
      "left-top right-full"
      "left-bottom right-full";
    margin: var(--spacer-sm) 0;
  }
}
</style>
