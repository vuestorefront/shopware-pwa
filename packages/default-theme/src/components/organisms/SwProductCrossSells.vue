<template>
  <div v-if="crossSellCollection.length" class="products__recomendations">
    <SfLoader :loading="isLoading">
      <div class="products-recomendations__section">
        <SfTabs :open-tab="1">
          <SfTab
            v-for="crossSellItem in crossSellCollection"
            :key="crossSellItem.crossSelling.id"
            :title="crossSellItem.crossSelling.translated.name"
          >
            <SwProductCarousel :products="crossSellItem.products" />
          </SfTab>
        </SfTabs>
      </div>
    </SfLoader>
  </div>
</template>
<script>
import { SfTabs, SfLoader } from "@storefront-ui/vue"
import { ref, watch, computed, onMounted } from "@vue/composition-api"
import { useProductAssociations, useDefaults } from "@shopware-pwa/composables"

export default {
  name: "SwProductCrossSells",
  components: {
    SfLoader,
    SfTabs,
    SwProductCarousel: () => import("@/components/SwProductCarousel.vue"),
  },
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
    crossSellings: {
      type: Array,
    },
  },
  setup(props, { root }) {
    const isLoading = ref(false)
    if (props.crossSellings) {
      const crossSellCollection = computed(() => props.crossSellings || [])
      return {
        crossSellCollection,
        isLoading,
      }
    }

    // Load product associations otherwise
    const { getIncludesConfig } = useDefaults(root, "useProductListing")
    const {
      loadAssociations: loadCrossSells,
      productAssociations: crossSellCollection,
    } = useProductAssociations(root, props.product, "cross-selling")

    onMounted(async () => {
      isLoading.value = true

      await loadCrossSells({
        params: {
          associations: {
            seoUrls: {},
          },
          includes: getIncludesConfig(),
        },
      })
      isLoading.value = false
    })
    return {
      crossSellCollection,
      isLoading,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.products__recomendations {
  @include for-desktop {
    margin-top: var(--spacer-xl);
  }

  ::v-deep .sf-tabs__content {
    max-width: 100%;
  }
}
</style>
