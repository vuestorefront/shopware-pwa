<template>
  <SfFooterColumn
    v-if="category"
    :key="category.id"
    :title="getTranslatedProperty(category, 'name')"
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
          <SfMenuItem :label="getTranslatedProperty(childCategory, 'name')" />
        </a>
        <nuxt-link
          v-else
          class="sf-header__link"
          :to="$routing.getUrl(getCategoryUrl(childCategory))"
        >
          <SfMenuItem :label="getTranslatedProperty(childCategory, 'name')" />
        </nuxt-link>
      </SfListItem>
    </SfList>
  </SfFooterColumn>
</template>
<script>
import { SfList, SfMenuItem } from "@storefront-ui/vue"
import {
  getCategoryUrl,
  isLinkCategory,
  getTranslatedProperty,
} from "@shopware-pwa/helpers"

export default {
  name: "SwFooterNavigationColumn",
  components: {
    SfList,
    SfMenuItem,
  },
  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    return {
      getCategoryUrl,
      isLinkCategory,
      getTranslatedProperty,
    }
  },
}
</script>
