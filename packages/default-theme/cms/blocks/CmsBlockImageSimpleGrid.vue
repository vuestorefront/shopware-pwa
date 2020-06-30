<template>
  <article class="sw-image-simple-grid">
    <CmsGenericElement
      :content="getLeftTopContent"
      class="sw-image-simple-grid__image sw-image-simple-grid__image--lt"
    />
    <CmsGenericElement
      :content="getLeftBottomContent"
      class="sw-image-simple-grid__image sw-image-simple-grid__image--lb"
    />
    <CmsGenericElement
      :content="getRightContent"
      class="sw-image-simple-grid__image sw-image-simple-grid__image--rf"
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
    "lt"
    "lb"
    "rf";
  grid-template-rows: repeat(3, 340px);
  margin: var(--spacer-sm);

  &__image {
    &--lt {
      grid-area: lt;
    }

    &--lb {
      grid-area: lb;
    }

    &--rf {
      grid-area: rf;
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
      "lt rf"
      "lb rf";
    margin: var(--spacer-sm) 0;
  }
}
</style>
