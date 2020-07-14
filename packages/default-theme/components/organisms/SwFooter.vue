<template>
  <SfFooter :column="column" :multiple="multiple" :open="open">
    <SfFooterColumn
      v-for="group in navigationLinks"
      :key="group.routeLabel"
      :title="group.routeLabel"
    >
      <SfList v-if="group.children && group.children.length">
        <SfListItem v-for="item in group.children" :key="item.routeLabel">
          <nuxt-link v-if="!item.isExternal" :to="$i18n.path(item.routePath)">
            <SfMenuItem :label="item.routeLabel" />
          </nuxt-link>
          <a :href="$i18n.path(item.routePath)" target="_new" v-else>
            <SfMenuItem :label="item.routeLabel" :title="item.routeLabel" />
          </a>
        </SfListItem>
      </SfList>
    </SfFooterColumn>
  </SfFooter>
</template>
<script>
import { SfFooter } from "@storefront-ui/vue"
import { SfHeader } from "@storefront-ui/vue"
import { SfList } from "@storefront-ui/vue"
import { SfImage } from "@storefront-ui/vue"
import { SfButton } from "@storefront-ui/vue"
import { SfMenuItem } from "@storefront-ui/vue"
import {} from "@storefront-ui/vue"

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
    SfHeader,
    SfList,
    SfImage,
    SfButton,
    SfMenuItem,
  },
  props: {
    navigationLinks: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      column: 4,
      multiple: false,
    }
  },
  computed: {
    open() {
      if (!this.navigationLinks) {
        return []
      }
      const labels = []
      extractLinksLabels(this.navigationLinks, labels)
      return labels
    },
  },
}
</script>
