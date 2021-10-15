<template>
  <SwProductGallery :product="product" />
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

  setup(props) {
    const { page } = useCms() // fallback for provide/inject, remove in future
    const cmsPage = inject("cms-page", page)
    const product = computed(() => cmsPage.value?.product)

    return {
      product,
    }
  },
}
</script>

<style lang="scss" scoped></style>
