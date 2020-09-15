<template>
  <SwProductCard
    :product="content.data.product"
    class="cms-element-product-card"
  />
</template>

<script>
import SwProductCard from "@shopware-pwa/default-theme/components/SwProductCard"

export default {
  components: {
    SwProductCard,
  },
  name: "CmsElementProductCard",
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/cms/settings.scss";
</style>
