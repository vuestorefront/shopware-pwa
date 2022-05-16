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
  setup(props) {
    const { page } = useCms() // fallback for provide/inject, remove in future
    const cmsPage = inject("cms-page", page)
    const product = computed(() => cmsPage.value?.product || props?.content?.data?.product)

    return {
      product,
    }
  },
}
</script>

<style lang="scss" scoped></style>
