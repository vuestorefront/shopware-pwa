<template>
  <SwProductDetails :product="product" />
</template>

<script>
import SwProductDetails from "@/components/SwProductDetails.vue"
import { useCms } from "@shopware-pwa/composables"
import { computed } from "@vue/composition-api"

export default {
  components: { SwProductDetails },
  name: "CmsElementBuyBox",
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
