<template>
  <article class="cms-block-product-three-column">
    <CmsElementProductCard
      :content="getLeftContent"
      class="cms-block-product-three-column__product"
    />
    <CmsElementProductCard
      :content="getCenterContent"
      class="cms-block-product-three-column__product"
    />
    <CmsElementProductCard
      :content="getRightContent"
      class="cms-block-product-three-column__product"
    />
  </article>
</template>

<script>
import CmsElementProductCard from "@/cms/elements/CmsElementProductCard"

export default {
  name: "CmsBlockProductThreeColumn",

  components: {
    CmsElementProductCard,
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

.cms-block-product-three-column {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  &__product {
    padding: var(--spacer-sm);
  }

  @include for-desktop {
    margin: var(--spacer-sm) 0;
  }
}
</style>
