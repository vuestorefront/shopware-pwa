<template>
  <SwProductGallery :content="content" />
</template>

<script>
import SwProductGallery from "@/components/SwProductGallery.vue"

export default {
  name: "CmsElementImageGallery",

  components: {
    SwProductGallery,
  },

  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped></style>
