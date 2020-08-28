<template>
  <article class="cms-block-text-three-column">
    <CmsGenericElement
      :content="getLeftContent"
      class="cms-block-text-three-column__text"
    />
    <CmsGenericElement
      :content="getCenterContent"
      class="cms-block-text-three-column__text"
    />
    <CmsGenericElement
      :content="getRightContent"
      class="cms-block-text-three-column__text"
    />
  </article>
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  name: "CmsBlockTextThreeColumn",

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

::v-deep.cms-block-text-three-column {
  display: grid;
  grid-template-rows: repeat(3, 340px);
  margin: var(--spacer-sm);

  &__text {
    padding: var(--spacer-sm);
  }

  @include for-desktop {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 340px);
    margin: var(--spacer-sm) 0;
  }

  @include for-mobile {
    display: initial;
  }
}
</style>
