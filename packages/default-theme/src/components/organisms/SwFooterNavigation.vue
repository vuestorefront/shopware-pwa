<template>
  <SfFooter
    :column="column"
    :multiple="true"
    :open="open"
    v-if="navigationLinks && navigationLinks.length"
  >
    <SfFooterColumn
      v-for="group in navigationLinks"
      :key="group.routeLabel"
      :title="group.routeLabel"
    >
      <SfList v-if="group.children && group.children.length">
        <SfListItem v-for="item in group.children" :key="item.routeLabel">
          <nuxt-link
            v-if="!item.isExternal"
            :to="$routing.getUrl(item.routePath)"
          >
            <SfMenuItem :label="item.routeLabel" />
          </nuxt-link>
          <a :href="$routing.getUrl(item.routePath)" target="_new" v-else>
            <SfMenuItem :label="item.routeLabel" :title="item.routeLabel" />
          </a>
        </SfListItem>
      </SfList>
    </SfFooterColumn>
  </SfFooter>
</template>
<script>
import { SfFooter, SfList, SfMenuItem } from "@storefront-ui/vue"
import { getStoreNavigation } from "@shopware-pwa/shopware-6-client"
import { onMounted, ref, computed } from "@vue/composition-api"
import { getApplicationContext } from "@shopware-pwa/composables"
import { getStoreNavigationRoutes } from "@shopware-pwa/helpers"

function extractLinksLabels(navigationLinks, aggregation = []) {
  for (const link of navigationLinks) {
    aggregation.push(link.routeLabel)
    if (link.children && link.children.length) {
      extractLinksLabels(link.children, aggregation)
    }
  }
}

export default {
  components: {
    SfFooter,
    SfList,
    SfMenuItem,
  },
  name: "SwFooterNavigation",
  setup({}, { root }) {
    const { apiInstance } = getApplicationContext(root, "SwFooter")
    const navigationLinks = ref([])
    const column = ref(4)

    onMounted(async () => {
      try {
        const navigationResponse = await getStoreNavigation(
          {
            requestActiveId: "footer-navigation",
            requestRootId: "footer-navigation",
            searchCriteria: {
              configuration: {
                includes: {
                  category: [
                    "seoUrls",
                    "externalLink",
                    "name",
                    "translated",
                    "id",
                    "children",
                  ],
                  seo_url: ["pathInfo", "seoPathInfo"],
                },
                associations: [
                  {
                    name: "seoUrls",
                  },
                ],
              },
            },
          },
          apiInstance
        )
        navigationLinks.value = getStoreNavigationRoutes(navigationResponse)
      } catch (e) {
        console.error("SwFooterNavigation:setup:onMounted", e)
      }
    })

    const open = computed(() => {
      if (!navigationLinks.value) {
        return []
      }
      const labels = []
      extractLinksLabels(navigationLinks.value, labels)
      return labels
    })

    return {
      navigationLinks,
      open,
      column,
    }
  },
}
</script>
