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
import CmsElementProductCard from "@shopware-pwa/default-theme/cms/elements/CmsElementProductCard"

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
  display: grid;
  grid-template-rows: repeat(3, 340px);
  margin: var(--spacer-sm);
  justify-items: center;

  &__product {
    padding: var(--spacer-sm);
  }

  @include for-desktop {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 340px);
    margin: var(--spacer-sm) 0;
    height: 100%;
    height: -moz-available; /* WebKit-based browsers will ignore this. */
    height: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
    height: stretch;
  }
}
</style>
