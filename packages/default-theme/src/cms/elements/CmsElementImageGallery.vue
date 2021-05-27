<template>
  <SwProductGallery :product="product" />
</template>

<script>
import SwProductGallery from "@/components/SwProductGallery.vue"
import { computed } from "@vue/composition-api"
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

  setup(props, { root }) {
    const { page } = useCms(root)

    return {
      product: computed(() => page.value?.product),
    }
  },
}
</script>

<style lang="scss" scoped></style>
