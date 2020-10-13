<template>
  <article class="cms-block-text-two-column">
    <CmsGenericElement
      :content="getLeftContent"
      class="cms-block-text-two-column__text"
    />
    <CmsGenericElement
      :content="getRightContent"
      class="cms-block-text-two-column__text"
    />
  </article>
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  name: "CmsBlockTextTwoColumn",

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

.cms-block-text-two-column {
  display: grid;
  grid-gap: 2rem;
  grid-template-rows: repeat(2, 340px);
  margin: var(--spacer-sm);

  &__text {
    padding: var(--spacer-sm);
  }

  @include for-desktop {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 340px);
    margin: var(--spacer-sm) 0;
  }

  @include for-mobile {
    display: initial;
  }
}
</style>
