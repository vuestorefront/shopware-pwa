<template>
  <SfFooter
    v-if="navigationElements && navigationElements.length"
    :column="column"
    :multiple="true"
    :open="open"
  >
    <SfFooterColumn
      v-for="category in navigationElements"
      :key="category.id"
      :title="category.translated.name"
    >
      <SfList v-if="category.children">
        <SfListItem
          v-for="childCategory in category.children"
          :key="childCategory.id"
        >
          <a
            v-if="isLinkCategory(childCategory)"
            class="sf-header__link"
            :href="getCategoryUrl(childCategory)"
            target="_blank"
          >
            <SfMenuItem :label="childCategory.translated.name" />
          </a>
          <nuxt-link
            v-else
            class="sf-header__link"
            :to="$routing.getUrl(getCategoryUrl(childCategory))"
          >
            <SfMenuItem :label="childCategory.translated.name" />
          </nuxt-link>
        </SfListItem>
      </SfList>
    </SfFooterColumn>
  </SfFooter>
</template>
<script>
import { SfFooter, SfList, SfMenuItem } from "@storefront-ui/vue"
import { ref, watch, computed } from "@vue/composition-api"
import { getCategoryUrl, isLinkCategory } from "@shopware-pwa/helpers"
import { useNavigation, useSharedState } from "@shopware-pwa/composables"
import { useDomains } from "@/logic"

function extractCategoryNames(categories, aggregation = []) {
  for (const category of categories) {
    aggregation.push(category.translated.name)
    if (category.children && category.children.length) {
      extractCategoryNames(category.children, aggregation)
    }
  }
}

export default {
  name: "SwFooterNavigation",
  components: {
    SfFooter,
    SfList,
    SfMenuItem,
  },
  setup(props, { root }) {
    const { loadNavigationElements, navigationElements } = useNavigation(root, {
      type: "footer-navigation",
    })
    const isLoadingFooterData = ref(false)

    const { currentDomainId } = useDomains(root)

    const column = ref(4)

    const open = computed(() => {
      if (!navigationElements.value) {
        return []
      }
      const names = []
      extractCategoryNames(navigationElements.value, names)
      return names
    })

    const { preloadRef } = useSharedState(root)
    preloadRef(navigationElements, async () => {
      await loadNavigationElements({ depth: 2 })
    })
    watch(currentDomainId, async () => {
      await loadNavigationElements({ depth: 2 })
    })

    return {
      navigationElements,
      getCategoryUrl,
      isLinkCategory,
      column,
      open,
    }
  },
}
</script>
