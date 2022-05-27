<template>
  <article class="cms-block-image-text-row">
    <div class="cms-element-column">
      <CmsGenericElement :content="getLeftImage" />
      <CmsGenericElement :content="getLeftText" />
    </div>
    <div class="cms-element-column">
      <CmsGenericElement :content="getCenterImage" />
      <CmsGenericElement :content="getCenterText" />
    </div>
    <div class="cms-element-column">
      <CmsGenericElement :content="getRightImage" />
      <CmsGenericElement :content="getRightText" />
    </div>
  </article>
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  name: "CmsBlockImageTextRow",

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
    getLeftText() {
      return this.getSlots.find(({ slot }) => slot === "left-text")
    },
    getLeftImage() {
      return this.getSlots.find(({ slot }) => slot === "left-image")
    },
    getCenterText() {
      return this.getSlots.find(({ slot }) => slot === "center-text")
    },
    getCenterImage() {
      return this.getSlots.find(({ slot }) => slot === "center-image")
    },
    getRightText() {
      return this.getSlots.find(({ slot }) => slot === "right-text")
    },
    getRightImage() {
      return this.getSlots.find(({ slot }) => slot === "right-image")
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/cms/settings.scss";

::v-deep.cms-block-image-text-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  .cms-element-column {
    align-content: center;
    flex: 1 1 30%;
    padding: var(--spacer-sm);
  }

  img {
    object-position: center;
    margin: 0 auto;
  }
}
</style>
