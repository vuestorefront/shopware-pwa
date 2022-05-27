<template>
  <article class="cms-block-product-heading">
    <CmsGenericElement
      :content="getProductNameContent"
      class="cms-block-product-heading__text"
    />
    <CmsGenericElement
      :content="getManufacturerLogoContent"
      class="cms-block-product-heading__image"
    />
  </article>
</template>

<script>
import CmsGenericElement from "sw-cms/CmsGenericElement"

export default {
  name: "CmsBlockProductHeading",

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

    getProductNameContent() {
      return this.getSlots.find(({ type }) => type === "product-name")
    },
    getManufacturerLogoContent() {
      return this.getSlots.find(({ type }) => type === "manufacturer-logo")
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.cms-block-product-heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;

  &__image,
  &__text {
    align-self: flex-start;
    flex: 1;
    --image-height: 50px;
    --image-width: 100%;
  }

  &__image {
    display: inline-flex;
    justify-content: flex-end
  }
}
</style>
