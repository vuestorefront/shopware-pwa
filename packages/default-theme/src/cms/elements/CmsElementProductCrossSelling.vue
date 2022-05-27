<template>
  <div class="products-recomendations">
    <SwProductCrossSells :cross-sellings="crossSellCollection" />
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/composition-api"
import { useProductAssociations } from "@shopware-pwa/composables"
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
    const cmsBasedProduct = computed(() => props.content?.config?.product?.value);
    onMounted(() => {
      if (crossSellCollection.value?.length === 0 && cmsBasedProduct.value) {
          const { loadAssociations } = useProductAssociations({
            product: { id: cmsBasedProduct.value },
            associationContext: "cross-selling",
          })
          loadAssociations({
            params: {
              associations: {
                seoUrls: {},
              },
            },
          })
      }
    });

    return {
      crossSellCollection,
    }
  },
}
</script>

<style lang="scss" scoped></style>
