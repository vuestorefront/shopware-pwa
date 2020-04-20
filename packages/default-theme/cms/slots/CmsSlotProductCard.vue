<template>
  <SwProductCard
    :product="content.data.product"
    class="cms-slot-product-card"
  />
</template>

<script>
import SwProductCard from '@shopware-pwa/default-theme/components/SwProductCard'

export default {
  components: {
    SwProductCard,
  },
  name: 'CmsSlotProductCard',
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../settings.scss';
</style>
