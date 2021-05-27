<template>
  <div class="products-recomendations">
    <SwProductCrossSells :cross-sellings="crossSellCollection" />
  </div>
</template>

<script>
import { computed } from "@vue/composition-api"

export default {
  components: {
    SwProductCrossSells: () =>
      import("@/components/organisms/SwProductCrossSells.vue"),
  },
  name: "CmsElementProductCrossSelling",
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const crossSellCollection = computed(
      () => props.content.data?.crossSellings || []
    )

    return {
      crossSellCollection,
    }
  },
}
</script>

<style lang="scss" scoped></style>
