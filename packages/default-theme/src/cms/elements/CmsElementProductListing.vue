<template>
  <SwProductListing
    :initialListing="content.data.listing"
    listingType="categoryListing"
  />
</template>

<script>
import SwProductListing from "@/components/SwProductListing.vue"

export default {
  name: "CmsElementProductListing",
  components: {
    SwProductListing,
  },
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
