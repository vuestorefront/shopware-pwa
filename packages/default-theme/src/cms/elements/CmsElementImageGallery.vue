<template>
  <SwProductGallery :content="content" />
</template>

<script>
import SwProductGallery from "@/components/SwProductGallery.vue"
import { computed, inject } from "@vue/composition-api"
import { useCms } from "@shopware-pwa/composables"

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
