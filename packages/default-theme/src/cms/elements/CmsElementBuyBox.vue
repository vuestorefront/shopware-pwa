<template>
  <SwProductDetails :product="product" />
</template>

<script>
import SwProductDetails from "@/components/SwProductDetails.vue"
import { useCms } from "@shopware-pwa/composables"
import { computed, inject } from "@vue/composition-api"

export default {
  components: { SwProductDetails },
  name: "CmsElementBuyBox",
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const { page } = useCms()
    const cmsProduct = computed(() => page.value?.product)

    const product = inject("cms-product", cmsProduct)

    return {
      product,
    }
  },
}
</script>

<style lang="scss" scoped></style>
