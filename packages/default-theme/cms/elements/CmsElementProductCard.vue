<template>
  <SwProductCard
    :product="content.data.product"
    class="cms-element-product-card"
  />
</template>

<script>
import SwProductCard from '@shopware-pwa/default-theme/components/SwProductCard'

export default {
  components: {
    SwProductCard,
  },
  name: 'CmsElementProductCard',
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

.cms-element-product-card {
  margin: 0 10px;
}

@media screen and (min-width: 1200px) {
  .cms-element-product-card {
    margin: 0 auto !important;
    max-width: 15%;
  }
}
</style>
