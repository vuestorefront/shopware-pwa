<template>
  <SwProductListingFilters listingType="categoryListing" />
</template>

<script>
import SwProductListingFilters from "@/components/SwProductListingFilters.vue"

export default {
  name: "CmsElementCategorySidebarFilter",
  components: {
    SwProductListingFilters,
  },
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
