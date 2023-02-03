<template>
  <div v-if="crossSellCollection.length" class="products__recomendations">
    <SfLoader :loading="isLoading">
      <div class="products-recomendations__section">
        <SfTabs :open-tab="1" @click:tab="changeTab">
          <SfTab
            v-for="crossSellItem in crossSellCollection"
            :key="crossSellItem.crossSelling.id"
            :title="getTranslatedProperty(crossSellItem.crossSelling, 'name')"
          >
            <SwProductCarousel ref="carousels" :products="crossSellItem.products" />
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
import { getTranslatedProperty } from "@shopware-pwa/helpers"

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
  setup(props) {
    const isLoading = ref(false)
    const carousels = ref(null);

    const changeTab = (e) => {
      carousels.value[e - 1]?.refresh();
    }

    if (props.crossSellings) {
      const crossSellCollection = computed(() => props.crossSellings || [])
      return {
        carousels,
        changeTab,
        crossSellCollection,
        isLoading,
        getTranslatedProperty,
      }
    }

    // Load product associations otherwise
    const { getIncludesConfig } = useDefaults({
      defaultsKey: "useProductListing",
    })
    const {
      loadAssociations: loadCrossSells,
      productAssociations: crossSellCollection,
    } = useProductAssociations({
      product: props.product,
      associationContext: "cross-selling",
    })

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
      carousels,
      changeTab,
      crossSellCollection,
      isLoading,
      getTranslatedProperty,
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
