<template>
  <SfFooter
    v-if="navigationElements && navigationElements.length"
    :column="column"
    :multiple="true"
    :open="open"
  >
    <SwFooterNavigationColumn v-for="category in navigationElements" :key="category.id" :category="category" />
    <SwFooterService />
  </SfFooter>
</template>
<script>
import { SfFooter } from "@storefront-ui/vue"
import SwFooterNavigationColumn from "@/components/organisms/SwFooterNavigationColumn.vue"
import SwFooterService from "@/components/organisms/SwFooterService.vue"
import { ref, watch, computed } from "@vue/composition-api"
import { getTranslatedProperty } from "@shopware-pwa/helpers"
import { useNavigation, useSharedState } from "@shopware-pwa/composables"
import { useDomains } from "@/logic"

function extractCategoryNames(categories, aggregation = []) {
  for (const category of categories) {
    aggregation.push(getTranslatedProperty(category, "name"))
    if (category.children && category.children.length) {
      extractCategoryNames(category.children, aggregation)
    }
  }
}

export default {
  name: "SwFooterNavigation",
  components: {
    SfFooter,
    SwFooterNavigationColumn,
    SwFooterService,
  },
  setup(props) {
    const { loadNavigationElements, navigationElements } = useNavigation({
      type: "footer-navigation",
    })
    const isLoadingFooterData = ref(false)

    const { currentDomainId } = useDomains()

    const column = ref(props.column)

    const open = computed(() => {
      if (!navigationElements.value) {
        return []
      }
      const names = []
      extractCategoryNames(navigationElements.value, names)
      return names
    })

    const { preloadRef } = useSharedState()
    preloadRef(navigationElements, async () => {
      await loadNavigationElements({ depth: 2 })
    })
    watch(currentDomainId, async () => {
      await loadNavigationElements({ depth: 2 })
    })

    return {
      navigationElements,
      column,
      open,
      getTranslatedProperty,
    }
  },
  props: {
    column: {
      type: Number,
      default: 4,
    },
  },
}
</script>
