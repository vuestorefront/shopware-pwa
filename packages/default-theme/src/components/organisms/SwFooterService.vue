<template>
  <SwFooterNavigationColumn     
    v-if="category"
    :key="category.id" 
    :category="category" 
  />
</template>
<script>
import { computed } from "@vue/composition-api"
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
    const category = computed(() => navigationElements.value?.[0])

    return {
      category,
    }
  },
}
</script>
