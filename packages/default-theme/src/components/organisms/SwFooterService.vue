<template>
  <SwFooterNavigationColumn     
    v-if="navigationElements && navigationElements.length"
    :key="navigationElements[0].id" 
    :category="navigationElements[0]" 
  />
</template>
<script>
import { getTranslatedProperty } from "@shopware-pwa/helpers"
import { ref } from "@vue/composition-api"
import { useNavigation, useSharedState } from "@shopware-pwa/composables"
import SwFooterNavigationColumn from "@/components/organisms/SwFooterNavigationColumn.vue"

export default {
  name: "SwFooterService",
  components: {
    SwFooterNavigationColumn,
  },
  setup() {
    const { loadNavigationElements, navigationElements } = useNavigation({
      type: "service-navigation",
    })
    const { preloadRef } = useSharedState()
    preloadRef(navigationElements, async () => {
      await loadNavigationElements({ depth: 2 })
    })
    return {
      navigationElements,
      getTranslatedProperty,
    }
  },
}
</script>
